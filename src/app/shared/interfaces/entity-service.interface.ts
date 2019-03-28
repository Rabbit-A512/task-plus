import { Observable } from 'rxjs';
import { IResponseArray } from './response-array.interface';

export type EntityId = string | number;

export interface IEntityService<TEntity, TCreateDto, TUpdateDto> {
  findOneById(id: EntityId): Observable<TEntity>;

  findAll(): Observable<IResponseArray<TEntity>>;

  findManyByCondition(condition: object): Observable<IResponseArray<TEntity>>;

  createOne(createDto: TCreateDto): Observable<TEntity>;

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity>;

  deleteOneById(id: EntityId): Observable<any>;
}
