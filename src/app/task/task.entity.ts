import { Todo } from '../todo/todo.entity';
import { Group } from '../group/group.entity';

export class Task extends Todo {
  group?: Group;
  groupId?: number;
}
