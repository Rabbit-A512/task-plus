import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    TodosComponent,
    TodoCardComponent,
    TodoFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TodosComponent,
  ],
  providers: [
    TodoService,
  ],
  entryComponents: [
    TodoFormComponent, // for mat-dialog
  ]
})
export class TodoModule { }
