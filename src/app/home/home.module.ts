import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TodoModule } from '../todo/todo.module';
import { ChooseDefaultGroupComponent } from './../group/components/choose-default-group/choose-default-group.component';
import { TaskModule } from './../task/task.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    TodoModule,
    TaskModule,
  ],
  exports: [
    HomeComponent,
  ],
  entryComponents: [
    ChooseDefaultGroupComponent,
  ],
})
export class HomeModule { }
