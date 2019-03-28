import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BadRequest } from 'src/app/shared/errors/bad-request';

import { ICredentials } from '../../interfaces/credentials.interface';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.message = '正在登录...';

    const credentials: ICredentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: success => {
        if (success) {
          this.snackBar.open('登录成功', 'OK', { duration: 1500 });
          const targetUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigateByUrl(targetUrl);
        } else {
          this.message = '用户名或密码错误';
        }
      },
      error: error => {
        if (error instanceof BadRequest) {
          this.message = '用户名或密码错误';
        }
      }
    });
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

}
