import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-progressbar",
  templateUrl: "./progressbar.component.html",
  styleUrls: ["./progressbar.component.scss"],
})
export class ProgressbarComponent implements OnInit {
  @Input() name: string;
  @Input() input: number;
  @Input() maximum: number;
  percent: number;

  constructor() {}

  ngOnInit() {
    this.percent = (this.input * 100) / this.maximum;
  }
}
