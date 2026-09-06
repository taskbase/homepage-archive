import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


  customers = [
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
