import { CreateUserDto } from './../../../user/dto/create-user.dto';
import { UserService } from './../../../user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notDuplicateValidator } from 'src/app/shared/custom-validators/confirm-password.validator';
import { uniqueFieldValidator } from 'src/app/shared/custom-validators/unique-field.validator';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [
        '', // <-- default
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_-]{6,25}$/),
        ],
        [
          uniqueFieldValidator('username', this.userService),
        ]
      ],
      nickname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
        ],
        [
          uniqueFieldValidator('nickname', this.userService),
        ]
      ],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,25}$/)]],
      confirm_password: [''],
    }, {
      validator: notDuplicateValidator('password', 'confirm_password'),
    });
  }

  get usernameControl() {
    return this.registerForm.get('username');
  }

  get nicknameControl() {
    return this.registerForm.get('nickname');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirm_password');
  }

  handleSubmit() {
    // FIXME: remove log
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }

    const reqBody: CreateUserDto = _.omit(this.registerForm.value, ['confirm_password']);
    this.userService.createOne(reqBody).subscribe({
      next: res => {
        this.snackBar.open('注册成功！', 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.router.navigate(['/']);
      },
      error: error => {
        // FIXME: remove log
        console.warn('注册失败', error);
      },
    });
  }

  get shouldShowConfirmPasswordError() {
    const interacted = this.confirmPasswordControl.touched || this.confirmPasswordControl.dirty;
    const error = this.registerForm.getError('notDuplicate');
    return !!error && interacted;
  }

}
