import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    TasksComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TasksComponent,
  ],
})
export class TaskModule { }
