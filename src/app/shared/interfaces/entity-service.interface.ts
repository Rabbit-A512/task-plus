import { Observable } from 'rxjs';

export type EntityId = string | number;

export interface IEntityService<TEntity, TCreateDto, TUpdateDto> {
  findOneById(id: EntityId): Observable<TEntity>;

  findAll(): Observable<TEntity[]>;

  findManyByCondition(condition: object): Observable<TEntity[]>;

  createOne(createDto: TCreateDto): Observable<TEntity>;

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity>;

  deleteOneById(id: EntityId): Observable<any>;
}
