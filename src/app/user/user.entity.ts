import { Todo } from '../todo/todo.entity';
import { Group } from './../group/group.entity';

export class User {
  id: string; // 因为是bigint，取出来JSON表示为string

  username: string;

  nickname: string;

  password: string;

  passwordHash: string;

  todos: Todo[];

  isDeleted: boolean;

  defaultGroupId?: number;

  defaultGroup?: Group;
}
