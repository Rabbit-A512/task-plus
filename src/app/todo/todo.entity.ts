import { User } from '../user/user.entity';

export class Todo {
  id: number;

  title: string;

  description: string;

  isFinished: boolean;

  createdAt: string;

  planToFinishAt: string;

  actuallyFinishedAt: string;

  // ============
  // relations
  // ============

  user: User;

  rootTodo: Todo;

  subTodos: Todo[];

  // =============
  // utilities
  // =============

  get isRoot(): boolean {
    return !this.rootTodo;
  }
}
