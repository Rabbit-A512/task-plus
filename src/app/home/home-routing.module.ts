import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../auth/guards/login.guard';
import { TasksComponent } from '../task/components/tasks/tasks.component';
import { TodosComponent } from '../todo/components/todos/todos.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: HomeComponent,
    children: [
      {
        // TODO: 仪表盘
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
      {
        path: 'change-password',
        canActivate: [LoginGuard],
        component: ChangePasswordComponent,
      },
      {
        path: 'todos',
        canActivate: [LoginGuard],
        component: TodosComponent,
      },
      {
        path: 'tasks',
        canActivate: [LoginGuard],
        component: TasksComponent
      }
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
export class HomeRoutingModule { }
