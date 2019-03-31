import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { AuthService } from './../../../auth/auth.service';
import { Todo } from './../../todo.entity';
import { TodoService } from './../../todo.service';
import { TodoFormComponent } from './../todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Partial<Todo>[];

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos(): void {

    const condition = {
      userId: this.authService.currentUser.id,
    };

    this.todoService.findManyByCondition(condition).pipe(
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

  handleDialogClose(shouldUpdateData: ShouldUpdateData) {
    if (shouldUpdateData) {
      this.loadTodos();
    }
  }

  addParentTodo() {
    const dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData> = this.dialog.open(TodoFormComponent, {
      ...DrawerDialogConfig,
      data: {}
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.loadTodos();
        }
      }
    });
  }

}
