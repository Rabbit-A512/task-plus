import { GroupModule } from './../group/group.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    TasksComponent,
  ],
  imports: [
    SharedModule,
    GroupModule,
  ],
  exports: [
    TasksComponent,
  ],
})
export class TaskModule { }
