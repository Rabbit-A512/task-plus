import { AsyncValidatorFn, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, debounceTime, throttleTime } from 'rxjs/operators';

import { handleServiceError } from '../errors/app-error-handler';
import { Unauthorized } from '../errors/unauthorized';
import { Injectable } from '@angular/core';

export interface EntityConditionService<T> {
  findManyByCondition(condition: object): Observable<T[]>;
}

@Injectable({
  providedIn: 'root',
})
export class UniqueFieldValidator<TEntity, TService extends EntityConditionService<TEntity>> {
  constructor(
    private readonly service: TService,
    private readonly router: Router,
  ) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.findManyByCondition({ [name]: control.value }).pipe(
      map(arr => arr.length > 0 ? { notUnique: true } : null),
      catchError(handleServiceError),
      catchError(error => {
        if (error instanceof Unauthorized) {
          this.router.navigate(['/auth/login']);
          return of(null);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}

export function uniqueFieldValidator<TEntity, TService extends EntityConditionService<TEntity>>
  (name: string, service: TService): AsyncValidatorFn {
  return function(control: FormControl): Observable<ValidationErrors | null> {
    return service.findManyByCondition({ [name]: control.value }).pipe(
      map(arr => arr.length > 0 ? { notUnique: true } : null),
      catchError(handleServiceError),
    );
  };
}
