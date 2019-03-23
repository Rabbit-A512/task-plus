import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHelperModule } from '../mat-helper/mat-helper.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/**
 * 用于在整个应用中提供通用的工具类
 *
 * @export
 */
@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MatHelperModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MatHelperModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule { }
