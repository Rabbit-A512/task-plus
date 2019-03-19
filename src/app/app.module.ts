import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSchematicsTestModule } from './mat-schematics-test/mat-schematics-test.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // custom-import
    SharedModule,
    MatSchematicsTestModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
