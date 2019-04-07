import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EntityId } from '../shared/interfaces/entity-service.interface';
import { IResponseArray } from '../shared/interfaces/response-array.interface';
import { User } from '../user/user.entity';
import { AuthService } from './../auth/auth.service';
import { BaseEntityService } from './../shared/base-entity.service';
import { Unauthorized } from './../shared/errors/unauthorized';
import { UpdateTodoDto } from './../todo/dto/update-todo.dto';
import { UserService } from './../user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseEntityService<Group, CreateGroupDto, UpdateTodoDto> {

  private _currentGroup: Group;

  public currentGroupId = new Subject<number>();

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

      const req$ = this.userService.findOneById(userId).pipe<Group>(
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
          this.currentGroupId.next(group.id);
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
    return this.http.get<IResponseArray<Group>>(url, options);
  }

  findParticipatedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const url = `${this.domainUrl}/participated/${userId}`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get<IResponseArray<Group>>(url, options);
  }

  findOwnersByGroupId(groupId: EntityId, skip?: number, take?: number): Observable<IResponseArray<User>> {
    const url = `${this.domainUrl}/${groupId}/owners`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get<IResponseArray<User>>(url, options);
  }

  findParticipatorsByGroupId(groupId: EntityId, skip?: number, take?: number): Observable<IResponseArray<User>> {
    const url = `${this.domainUrl}/${groupId}/participators`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get<IResponseArray<User>>(url, options);
  }

  get currentGroup() {
    return this._currentGroup;
  }

  set currentGroup(group: Group) {
    this._currentGroup = group;
  }
}

