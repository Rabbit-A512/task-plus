import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { MatSchematicsTestModule } from './mat-schematics-test/mat-schematics-test.module';
import { AuthConstants } from './shared/constants';
import { AppErrorHandler } from './shared/errors/app-error-handler';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(AuthConstants.JWT_TOKEN_NAME),
        whitelistedDomains: ['localhost:3000']
      }
    }),

    // custom modules
    SharedModule,
    AuthModule,
    HomeModule,
    MatSchematicsTestModule,
    AppRoutingModule,
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
