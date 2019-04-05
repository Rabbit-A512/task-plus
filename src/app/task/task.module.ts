import { ChooseDefaultGroupComponent } from './../group/components/choose-default-group/choose-default-group.component';
import { GroupModule } from './../group/group.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskFormComponent,
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
