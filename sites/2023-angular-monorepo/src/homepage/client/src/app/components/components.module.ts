import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArrowComponent } from "./arrow/arrow.component";
import { ProgressbarComponent } from "./progressbar/progressbar.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ArrowComponent, ProgressbarComponent],
  exports: [ArrowComponent, ProgressbarComponent],
})
export class ComponentsModule {}
