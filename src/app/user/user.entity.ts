import { Todo } from '../todo/todo.entity';
import { Group } from './../group/group.entity';
import { Task } from '../task/task.entity';

export class User {
  id: number;

  username: string;

  nickname: string;

  password: string;

  passwordHash: string;

  todos: Todo[];

  tasks: Task[];

  isDeleted: boolean;

  defaultGroupId?: number;

  // defaultGroup?: Group;
}
