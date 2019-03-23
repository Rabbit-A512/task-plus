import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class UserModule { }
