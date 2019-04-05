import { Group } from '../group/group.entity';
import { User } from '../user/user.entity';

export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export class Task {
  id: number;

  title: string;

  description?: string;

  isFinished: boolean;

  createdAt: string;

  planToFinishAt?: string;

  actuallyFinishedAt?: string;

  priority: number;

  // ============
  // relations
  // ============

  user?: User;
  userId?: number;

  parent?: Task;
  parentId?: number;

  children?: Task[];

  group?: Group;
  groupId?: number;
}
