import { HttpClient } from '@angular/common/http';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { BaseEntityService } from './../shared/base-entity.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends BaseEntityService<Todo, CreateTodoDto, UpdateTodoDto> {
  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, 'todos');
  }
}
