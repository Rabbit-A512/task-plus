import { EntityId } from 'src/app/shared/interfaces/entity-service.interface';

export interface IUserPayload {
  id: EntityId;
  nickname: string;
}
