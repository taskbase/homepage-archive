import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { taskbaseTechnologies } from "../../taskbase-technologies";

@Component({
  selector: "app-technology-navbar",
  templateUrl: "./technology-navbar.component.html",
  styleUrls: ["./technology-navbar.component.scss"],
})
export class TechnologyNavbarComponent implements OnInit {
  id: number;
  readonly techs = taskbaseTechnologies;

  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"]; // (+) converts string 'id' to a number
    });
  }
}
