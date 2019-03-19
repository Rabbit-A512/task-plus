import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHelperModule } from '../mat-helper/mat-helper.module';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * 用于在整个应用中提供通用的工具类
 *
 * @export
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatHelperModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MatHelperModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
