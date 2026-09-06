import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-showcases",
  templateUrl: "./showcases.component.html",
  styleUrls: ["./showcases.component.scss"],
})
export class ShowcasesComponent implements OnInit {
  showcases = [
    {
      logo: this.buildLogoUrl("e-maths.png"),
      style: {
        height: "auto",
        width: "100%",
      },
      description:
        "Eine Lehrnplattform für Studienanfänger an der Universität St. Gallen.",
      year: 2015,
    },
    {
      logo: this.buildLogoUrl("acadilly.png"),
      style: {
        height: "auto",
        width: "100%",
      },
      description:
        "Eine Plattform zur Unterrichtsvorbereitung für Lehrpersonen.",
      year: 2016,
    },
    {
      logo: this.buildLogoUrl("lernnavi.png"),
      style: {
        height: "auto",
        width: "100%",
      },
      description:
        "Das technologisch anspruchsvollste e-learning Projekt der Schweiz.",
      year: 2021,
    },
  ];

  constructor() {}

  ngOnInit() {}

  private buildLogoUrl(logo: string) {
    return `/assets/img/${logo}`;
  }
}
