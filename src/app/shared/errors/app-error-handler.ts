import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { AppError } from './app-error';
import { BadRequest } from './bad-request';
import { NotFound } from './not-found';
import { Unauthorized } from './unauthorized';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler extends ErrorHandler {

  constructor(
    private readonly router: Router,
  ) {
    super();
  }

  handleError(error: any) {
    // alert('An unexpected error occurred.\nSee console.warn.');
    console.warn(error);
    if (error instanceof Unauthorized) {
      console.warn('Unauthorized, redirecting...');
      this.router.navigate(['/auth/login']);
    }
  }
}

export function handleServiceError(error: Response) {
  switch (error.status) {
    case 400:
      return throwError(new BadRequest(error));
    case 401:
      return throwError(new Unauthorized(error));
    case 404:
      return throwError(new NotFound(error));
    default:
      return throwError(new AppError(error));
  }
}
