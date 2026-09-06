import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcases.component.html',
  styleUrls: ['./showcases.component.scss']
})
export class ShowcasesComponent implements OnInit {

  showcases = [
    {
      logo: this.buildLogoUrl('e-maths.png'),
      style: {
        height: '30px',
        width: 'auto'
      }
    },
    {
      logo: this.buildLogoUrl('acadilly.png'),
      style: {
        height: '45px',
        width: 'auto'
      }
    },
    {
      logo: this.buildLogoUrl('lernnavi-logo.svg'),
      style: {
        height: '50px',
        width: 'auto'
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  private buildLogoUrl(logo: string) {
    return `/assets/img/logos/${logo}`;
  }

}
