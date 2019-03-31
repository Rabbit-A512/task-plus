import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService } from './todo.service';
import { SubTodoCardComponent } from './components/sub-todo-card/sub-todo-card.component';
import { DeleteConfirmDialogComponent } from '../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    TodosComponent,
    TodoCardComponent,
    TodoFormComponent,
    SubTodoCardComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
  ],
  exports: [
    TodosComponent,
  ],
  providers: [
    TodoService,
  ],
  entryComponents: [
    // for mat-dialog
    TodoFormComponent,
    DeleteConfirmDialogComponent,
  ]
})
export class TodoModule { }
