import { NgModule } from "@angular/core";
import { ImpressumComponent } from "./impressum.component";
import { TeamModule } from "../team/team.module";

@NgModule({
  imports: [TeamModule],
  declarations: [ImpressumComponent],
  exports: [ImpressumComponent],
})
export class ImpressumModule {}
