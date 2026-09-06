import { NgModule } from "@angular/core";
import { LandingComponent } from "./landing.component";
import { ContactComponent } from "./contact/contact.component";
import { CustomersComponent } from "./customers/customers.component";
import { DummyComponent } from "./dummy/dummy.component";
import { JumboComponent } from "./jumbo/jumbo.component";
import { ModuleExampleComponent } from "./module-example/module-example.component";
import { OfferComponent } from "./offer/offer.component";
import { ProjectComponent } from "./project/project.component";
import { ShowcasesComponent } from "./showcases/showcases.component";
import { TbModulesComponent } from "./tb-modules/tb-modules.component";
import { TechbodyComponent } from "./techbody/techbody.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { ValuepropComponent } from "./valueprop/valueprop.component";
import { ComponentsModule } from "../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SpinnerModule } from "@taskbase/spinner";

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SpinnerModule,
  ],
  declarations: [
    LandingComponent,
    ContactComponent,
    CustomersComponent,
    DummyComponent,
    JumboComponent,
    ModuleExampleComponent,
    OfferComponent,
    ProjectComponent,
    ShowcasesComponent,
    TbModulesComponent,
    TechbodyComponent,
    TestimonialsComponent,
    ValuepropComponent,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
