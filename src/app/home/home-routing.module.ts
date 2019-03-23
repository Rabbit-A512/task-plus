import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../auth/guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: HomeComponent,
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class HomeRoutingModule {}
