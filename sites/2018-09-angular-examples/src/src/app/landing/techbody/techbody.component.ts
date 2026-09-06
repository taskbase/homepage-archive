import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-techbody',
  templateUrl: './techbody.component.html',
  styleUrls: ['./techbody.component.scss']
})
export class TechbodyComponent implements OnInit {

  activeTech = -1;
  techs;

  constructor(private dataService: DataService,
              private router: Router) {
    this.techs = dataService.techs;
  }

  ngOnInit() {
  }

  mouseEnter(val) {
    this.setActiveTech(val);
  }

  mouseLeave(val) {
    this.setActiveTech(-1);
  }

  setActiveTech(val) {
    this.activeTech = val;
  }

  private buildPicUrl(pic: string) {
    return `/assets/img/tech/${pic}`;
  }

  onClick(i) {
    this.router.navigate([], {
      fragment: 'modules'
    }).then(e => this.router.navigate(['technology', i]));
  }

}
