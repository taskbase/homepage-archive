import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  explanation = "";
  indexOfHoveredItem = null;

  customers = [
    {
      logo: this.buildLogoUrl("neu/eth_g.png"),
      logohover: this.buildLogoUrl("neu/eth.png"),
      link: "http://www.eth.ch",
      explanation: "ETH Zürich",
      style: {
        height: "50px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/lmvsg_g.png"),
      logohover: this.buildLogoUrl("neu/lmvsg.jpg"),
      link: "http://www.lehrmittelverlag.ch/",
      explanation: "Lehrmittelverlag St. Gallen",
      style: {
        height: "120px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/hsg_g.png"),
      logohover: this.buildLogoUrl("neu/hsg.png"),
      link: "http://www.unisg.ch/",
      explanation: "Universität St.Gallen",
      style: {
        height: "40px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/dmk_g.png"),
      logohover: this.buildLogoUrl("neu/dmk.png"),
      link: "http://dmk.vsmp.ch/",
      explanation: "Deutschschweizerische Mathematik-Kommission",
      style: {
        height: "55px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/orellfuessli_g.png"),
      logohover: this.buildLogoUrl("neu/orellfuessli.png"),
      link: "https://ofv.ch/",
      explanation: "Orell Füssli Verlag",
      style: {
        height: "25px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/sik_g.png"),
      logohover: this.buildLogoUrl("neu/sik.png"),
      link: "http://schuleimkoffer.ch/",
      explanation: "Schule im Koffer",
      style: {
        height: "55px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/acadilly_g.svg"),
      logohover: this.buildLogoUrl("neu/acadilly.svg"),
      link: "http://www.acadilly.com",
      explanation: "acadilly.com",
      style: {
        height: "40px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/lernnavi_g.png"),
      logohover: this.buildLogoUrl("neu/lernnavi.png"),
      link: "http://www.lernnavi.ch",
      explanation: "Lernnavi",
      style: {
        height: "45px",
      },
    },
    {
      logo: this.buildLogoUrl("neu/emaths_g.png"),
      logohover: this.buildLogoUrl("neu/emaths.png"),
      link: "http://www.e-maths.ch",
      explanation: "e-maths.ch",
      style: {
        height: "35px",
      },
    },
  ];

  constructor() {}

  ngOnInit() {}

  mouseEnter(expl: string) {
    this.explanation = expl;
  }

  mouseLeave() {
    this.explanation = "";
  }

  private buildLogoUrl(logo: string) {
    return `/assets/img/logos/${logo}`;
  }
}
