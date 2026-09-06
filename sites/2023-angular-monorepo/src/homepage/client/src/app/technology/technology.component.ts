import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { taskbaseTechnologies } from "../taskbase-technologies";

@Component({
  selector: "app-technology",
  templateUrl: "./technology.component.html",
  styleUrls: ["./technology.component.scss"],
})
export class TechnologyComponent implements OnInit {
  id: number;
  link: string;
  private sub: any;

  readonly techs = taskbaseTechnologies;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.link = params["link"];
      this.id = this.techs.findIndex((element) => element.link === this.link);
    });
  }
}
