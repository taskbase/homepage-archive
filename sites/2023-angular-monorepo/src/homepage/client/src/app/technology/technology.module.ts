import { NgModule } from "@angular/core";
import { TechnologyComponent } from "./technology.component";
import { TechnologyNavbarComponent } from "./technology-navbar/technology-navbar.component";
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerModule } from "@taskbase/spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  declarations: [
    TechnologyComponent,
    TechnologyNavbarComponent,
    SubscribeComponent,
  ],
  exports: [TechnologyComponent],
})
export class TechnologyModule {}
