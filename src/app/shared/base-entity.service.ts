import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { URLConstants } from './constants';
import { handleServiceError } from './errors/app-error-handler';
import { EntityId, IEntityService } from './interfaces/entity-service.interface';
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
    return this.http.get<TEntity>(url).pipe(
      catchError(handleServiceError),
    );
  }

  findAll(skip?: number, take?: number) {
    const url = this.domainUrl;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.get<IResponseArray<TEntity>>(url, options);
  }

  findManyByCondition(condition: object, skip?: number, take?: number) {
    const url = `${this.domainUrl}/condition`;
    const options = BaseEntityService.makePaginationOptions(skip, take);
    return this.http.post<IResponseArray<TEntity>>(url, condition, options);
  }

  createOne(createDto: TCreateDto): Observable<TEntity> {
    const url = this.domainUrl;
    return this.http.post<TEntity>(url, createDto).pipe(
      catchError(handleServiceError),
    );
  }

  updateOneById(id: EntityId, updateDto: Partial<TUpdateDto>): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.put<TEntity>(url, updateDto).pipe(
      catchError(handleServiceError),
    );
  }

  deleteOneById(id: EntityId): Observable<TEntity> {
    const url = `${this.domainUrl}/${id}`;
    return this.http.delete<TEntity>(url).pipe(
      catchError(handleServiceError),
    );
  }

}
