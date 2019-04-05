import { HasCurrentGroupGuard } from './../task/guards/has-current-group.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../auth/guards/login.guard';
import { TasksComponent } from '../task/components/tasks/tasks.component';
import { TodosComponent } from '../todo/components/todos/todos.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { GroupsComponent } from '../group/components/groups/groups.component';

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
        path: 'groups',
        canActivate: [LoginGuard],
        component: GroupsComponent,
      },
      {
        path: 'tasks',
        canActivate: [LoginGuard, HasCurrentGroupGuard],
        component: TasksComponent,
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
