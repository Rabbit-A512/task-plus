import { UpdateTodoDto } from 'src/app/todo/dto/update-todo.dto';

export class UpdateTaskDto extends UpdateTodoDto {
  priority?: number;
}
