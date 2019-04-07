import { ChooseDefaultGroupComponent } from './../group/components/choose-default-group/choose-default-group.component';
import { GroupModule } from './../group/group.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { UndistributedTasksComponent } from './components/undistributed-tasks/undistributed-tasks.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskFormComponent,
    UserTasksComponent,
    TaskCardComponent,
    UndistributedTasksComponent,
    TasksTableComponent,
  ],
  imports: [
    SharedModule,
    GroupModule,
  ],
  exports: [
    TasksComponent,
  ],
  entryComponents: [
    TaskFormComponent,
    ChooseDefaultGroupComponent,
  ],
})
export class TaskModule { }
