import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { BaseEntityService } from '../shared/base-entity.service';
import { handleServiceError } from '../shared/errors/app-error-handler';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IChangePassword } from './interfaces/change-password.interface';
import { User } from './user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseEntityService<User, CreateUserDto, UpdateUserDto> {

  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, 'users');
  }

  changePassword(passwords: IChangePassword) {
    const url = `${this.domainUrl}/change-password`;
    return this.http.post(url, passwords).pipe(
      catchError(handleServiceError),
    );
  }
}
