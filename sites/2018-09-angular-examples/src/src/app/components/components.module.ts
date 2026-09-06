import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ArrowComponent],
  exports: [
    ArrowComponent
  ]
})
export class ComponentsModule { }
