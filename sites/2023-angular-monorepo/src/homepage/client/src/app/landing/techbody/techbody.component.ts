import { Component, OnInit } from "@angular/core";
import { taskbaseTechnologies } from "../../taskbase-technologies";
import { HOMEPAGE_ROUTE_BUILDER } from "../../routing/homepage-routes";

@Component({
  selector: "app-techbody",
  templateUrl: "./techbody.component.html",
  styleUrls: ["./techbody.component.scss"],
})
export class TechbodyComponent implements OnInit {
  activeTech: number | null = null;
  readonly techs = taskbaseTechnologies;

  constructor() {}

  ngOnInit() {}

  mouseEnter(idx: number) {
    this.setActiveTech(idx);
  }

  mouseLeave() {
    this.setActiveTech(null);
  }

  setActiveTech(idx: number | null) {
    this.activeTech = idx;
  }

  buildTechLink(techLink: string) {
    return HOMEPAGE_ROUTE_BUILDER.technology(techLink);
  }
}
