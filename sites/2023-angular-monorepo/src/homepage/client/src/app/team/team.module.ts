import { NgModule } from "@angular/core";
import { TeamComponent } from "./team.component";
import { BusinessCardComponent } from "./business-card/business-card.component";
import { AddressComponent } from "./address/address.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [TeamComponent, BusinessCardComponent, AddressComponent],
  exports: [TeamComponent, AddressComponent],
})
export class TeamModule {}
