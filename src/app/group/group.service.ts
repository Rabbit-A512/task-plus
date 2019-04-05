import { UserService } from './../user/user.service';
import { Unauthorized } from './../shared/errors/unauthorized';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEntityService } from './../shared/base-entity.service';
import { UpdateTodoDto } from './../todo/dto/update-todo.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { EntityId } from '../shared/interfaces/entity-service.interface';
import { Observable, of } from 'rxjs';
import { IResponseArray } from '../shared/interfaces/response-array.interface';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseEntityService<Group, CreateGroupDto, UpdateTodoDto> {

  private _currentGroup: Group;

  constructor(
    protected readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    super(http, 'groups');
    this.setUpDefaultGroup();
  }

  setUpDefaultGroup(): void {
    try {
      const currentUser = this.authService.currentUser;
      const { id: userId } = currentUser;

      const req$ = this.userService.findOneById(userId).pipe(
        switchMap(user => {
          if (user.defaultGroupId) {
            return this.findOneById(user.defaultGroupId);
          } else {
            return of(null);
          }
        }),
      );

      req$.subscribe({
        next: group => {
          this._currentGroup = group;
        }
      });

    } catch (e) {
      if (e instanceof Unauthorized) {
        this.router.navigateByUrl('/auth/login');
      }
    }
  }

  findOwnedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const url = `${this.domainUrl}/owned/${userId}`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get(url, options).pipe(
      map(res => res as IResponseArray<Group>),
    );
  }

  findParticipatedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const url = `${this.domainUrl}/participated/${userId}`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get(url, options).pipe(
      map(res => res as IResponseArray<Group>),
    );
  }

  get currentGroup() {
    return this._currentGroup;
  }

  set currentGroup(group: Group) {
    this._currentGroup = group;
  }
}

