import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsParticipatedComponent } from './components/groups-participated/groups-participated.component';
import { GroupsOwnedComponent } from './components/groups-owned/groups-owned.component';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupFormComponent,
    GroupsParticipatedComponent,
    GroupsOwnedComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    GroupsComponent,
  ],
  entryComponents: [
    GroupFormComponent,
  ],
})
export class GroupModule { }
