import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
