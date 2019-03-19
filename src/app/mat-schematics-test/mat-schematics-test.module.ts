import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardTestComponent } from './components/dashboard-test/dashboard-test.component';
import { FormTestComponent } from './components/form-test/form-test.component';
import { NavTestComponent } from './components/nav-test/nav-test.component';
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [
    RootComponent,
    NavTestComponent,
    DashboardTestComponent,
    FormTestComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    RootComponent,
  ],
})
export class MatSchematicsTestModule { }
