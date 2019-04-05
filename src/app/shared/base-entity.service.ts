import { HttpClient, HttpParams } from '@angular/common/http';
import { URLConstants } from './constants';
import { Observable } from 'rxjs';

import { IEntityService, EntityId } from './interfaces/entity-service.interface';
import { map, catchError } from 'rxjs/operators';
import { handleServiceError } from './errors/app-error-handler';
import { IResponseArray } from './interfaces/response-array.interface';
import { ISimpleQueryParams } from './interfaces/simple-query-params.interface';

export class BaseEntityService<TEntity, TCreateDto, TUpdateDto> implements IEntityService<TEntity, TCreateDto, TUpdateDto> {
  constructor(
    protected readonly http: HttpClient,
    protected readonly entityNamePlural: string,
    protected readonly rootUrl: string = URLConstants.ROOT,
  ) {}

  get domainUrl() {
    return `${this.rootUrl}/${this.entityNamePlural}`;
  }

  static makePaginationOptions(skip?: number, take?: number): ISimpleQueryParams {
    return !!skip && !!take ? {
      params: {
        skip: String(skip),
        take: String(take),
      },
    } : {};
  }

  findOneById(id: EntityId): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.get(url).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

  findAll(skip?: number, take?: number) {
    const url = this.domainUrl;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get(url, options).pipe(
      map(arr => arr as IResponseArray<TEntity>),
    );
  }

  findManyByCondition(condition: object, skip?: number, take?: number) {
    const url = `${this.domainUrl}/condition`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.post(url, condition, options).pipe(
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

  updateOneById(id: EntityId, updateDto: Partial<TUpdateDto>): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.put(url, updateDto).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

  deleteOneById(id: EntityId): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.delete(url).pipe(
      map(v => v as TEntity),
      catchError(handleServiceError),
    );
  }

}
