import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Todo } from './../../todo.entity';
import { TodoService } from './../../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Partial<Todo>[];

  constructor(
    private readonly todoService: TodoService,
  ) { }

  ngOnInit() {
    this.todoService.findAll().pipe(
      map(res => {
        res.data = res.data.filter(todo => !todo.parent);
        // FIXME: remove log
        console.log(res.data);
        return res;
      }),
    ).subscribe({
      next: res => {
        this.todos = res.data;
      }
    });
  }

}
