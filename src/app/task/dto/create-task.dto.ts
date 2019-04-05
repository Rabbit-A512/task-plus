import { CreateTodoDto } from './../../todo/dto/create-todo.dto';

export class CreateTaskDto extends CreateTodoDto {
  priority: number;
}
