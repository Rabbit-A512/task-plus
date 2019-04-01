import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEntityService } from './../shared/base-entity.service';
import { UpdateTodoDto } from './../todo/dto/update-todo.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { EntityId } from '../shared/interfaces/entity-service.interface';
import { Observable } from 'rxjs';
import { IResponseArray } from '../shared/interfaces/response-array.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseEntityService<Group, CreateGroupDto, UpdateTodoDto> {
  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, 'groups');
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
}

