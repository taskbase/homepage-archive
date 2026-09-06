import { Component, OnInit } from '@angular/core';
import {TeamMember} from './business-card/business-card.component';

@Component({
  selector: 'app-team-page',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamPageComponent implements OnInit {

  teamMembers: TeamMember[] = [{
    name: 'Samuel Portmann',
    pic: this.getPicUrl('samuel.png'),
    description: 'Business Development'
  }, {
    name: 'Jost Joller',
    pic: this.getPicUrl('jost.png'),
    description: 'Software Development'
  }, {
    name: 'Daniel Niederberger',
    pic: this.getPicUrl('daniel.png'),
    description: 'Software Development'
  }];

  constructor() { }

  ngOnInit() {
  }

  getPicUrl(picEndpoint: string) {
    return `/assets/img/team/${picEndpoint}`;
  }

}
