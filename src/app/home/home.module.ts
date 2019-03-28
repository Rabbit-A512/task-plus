import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodoModule } from '../todo/todo.module';

@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    TodoModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
