import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { notDuplicateValidator } from 'src/app/shared/custom-validators/confirm-password.validator';
import { IChangePassword } from 'src/app/user/interfaces/change-password.interface';

import { BadRequest } from './../../../shared/errors/bad-request';
import { UserService } from './../../../user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  errorMessage: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,25}$/)]],
      confirm_password: [''],
    }, {
      validator: notDuplicateValidator('new_password', 'confirm_password', 'confirmPasswordError'),
    });
  }

  get oldPasswordControl() {
    return this.changePasswordForm.get('old_password');
  }

  get newPasswordControl() {
    return this.changePasswordForm.get('new_password');
  }

  get confirmPasswordControl() {
    return this.changePasswordForm.get('confirm_password');
  }

  get shouldShowConfirmPasswordError() {
    const interacted = this.changePasswordForm.touched || this.changePasswordForm.dirty;
    const error = this.changePasswordForm.getError('confirmPasswordError');
    return !!error && interacted;
  }

  handleSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const passwords: IChangePassword = _.omit(this.changePasswordForm.value, ['confirm_password']);

    this.userService.changePassword(passwords).subscribe({
      next: (res: { message: string }) => {
        this.snackBar.open(res.message, 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: error => {
        if (error instanceof BadRequest) {
          const originalError = error.originalError as HttpErrorResponse;
          this.errorMessage = originalError.error.message;
        }
      },
    });
  }

}
