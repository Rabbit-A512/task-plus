import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { handleServiceError } from '../shared/errors/app-error-handler';
import { AuthConstants, URLConstants } from './../shared/constants';
import { ICredentials } from './interfaces/credentials.interface';
import { IToken } from './interfaces/token.interface';
import { IUserPayload } from '../user/interfaces/user-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {}

  private jwtHelper = new JwtHelperService();

  // storing for redirect
  redirectUrl: string;

  login(credentials: ICredentials): Observable<boolean> {
    const loginURL = `${URLConstants.ROOT}/auth/login`;
    return this.http.post(loginURL, credentials).pipe(
      map((res: IToken) => {
        if (res && res.token) {
          // successful login
          localStorage.setItem(AuthConstants.JWT_TOKEN_NAME, res.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError(handleServiceError),
    );
  }

  logout(): void {
    localStorage.removeItem(AuthConstants.JWT_TOKEN_NAME);
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem(AuthConstants.JWT_TOKEN_NAME);

    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  get currentUser(): IUserPayload {
    const token = localStorage.getItem(AuthConstants.JWT_TOKEN_NAME);
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      // FIXME: remove log
      console.warn('jwt decode error: ', error);
      return null;
    }
  }
}
