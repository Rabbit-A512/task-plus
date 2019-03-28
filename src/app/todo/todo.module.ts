import { NgModule } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';
import { SharedModule } from '../shared/shared.module';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

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
  ]
})
export class TodoModule { }
