import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-arrow",
  templateUrl: "./arrow.component.html",
  styleUrls: ["./arrow.component.scss"],
})
export class ArrowComponent implements OnInit {
  @Input() direction: string;
  @Input() color1: string;
  @Input() height: number;

  constructor() {}

  ngOnInit() {}
}
