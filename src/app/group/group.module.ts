import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsParticipatedComponent } from './components/groups-participated/groups-participated.component';
import { GroupsOwnedComponent } from './components/groups-owned/groups-owned.component';
import { ChooseDefaultGroupComponent } from './components/choose-default-group/choose-default-group.component';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupFormComponent,
    GroupsParticipatedComponent,
    GroupsOwnedComponent,
    ChooseDefaultGroupComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    GroupsComponent,
    ChooseDefaultGroupComponent,
  ],
  entryComponents: [
    GroupFormComponent,
  ],
})
export class GroupModule { }
