import { HttpClient } from '@angular/common/http';
import { URLConstants } from './constants';
import { Observable } from 'rxjs';

import { IEntityService, EntityId } from './interfaces/entity-service.interface';
import { map, catchError } from 'rxjs/operators';
import { handleServiceError } from './errors/app-error-handler';
import { IResponseArray } from './interfaces/response-array.interface';

export class BaseEntityService<TEntity, TCreateDto, TUpdateDto> implements IEntityService<TEntity, TCreateDto, TUpdateDto> {
  constructor(
    public readonly http: HttpClient,
    public readonly entityNamePlural: string,
    public readonly rootUrl: string = URLConstants.ROOT,
  ) {}

  get domainUrl() {
    return `${this.rootUrl}/${this.entityNamePlural}`;
  }

  findOneById(id: EntityId): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.get(url).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

  findAll() {
    const url = this.domainUrl;
    return this.http.get(url).pipe(
      map(arr => arr as IResponseArray<TEntity>),
    );
  }

  findManyByCondition(condition: object) {
    const url = `${this.domainUrl}/condition`;
    return this.http.post(url, condition).pipe(
      map(arr => arr as IResponseArray<TEntity>),
    );
  }

  createOne(createDto: TCreateDto): Observable<TEntity> {
    const url = this.domainUrl;
    return this.http.post(url, createDto).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.put(url, updateDto).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

  deleteOneById(id: EntityId): Observable<any> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(handleServiceError),
    );
  }

}
