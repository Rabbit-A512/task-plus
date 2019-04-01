import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/group-form/group-form.component';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    GroupsComponent,
  ],
})
export class GroupModule { }
