import {Component, OnInit} from '@angular/core';
import {TeamMember} from './business-card/business-card.component';

@Component({
  selector: 'app-team-page',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamPageComponent implements OnInit {

  teamMembers: TeamMember[] = [{
    name: 'Samuel Portmann',
    pic: this.getPicUrl('samuel.svg'),
    function1: 'Founder & Software Developer',
    function2: 'Business Innovation, HSG St. Gallen',
    description: 'Der Drahtzieher',
    link: 'https://www.linkedin.com/in/samuel-portmann-b532b27b/'
  }, {
    name: 'Jost Joller',
    pic: this.getPicUrl('jost.svg'),
    function1: 'Founder & Software Developer',
    function2: 'Computer Science, ETH Zürich',
    description: 'Der Architekt',
    link: 'https://www.linkedin.com/in/jostjoller/'
  }, {
    name: 'Daniel Niederberger',
    pic: this.getPicUrl('daniel.svg'),
    function1: 'Founder & Software Developer',
    function2: 'Physics, ETH Zürich',
    description: 'Der Datenspezialist',
    link: 'https://www.linkedin.com/in/daniel-niederberger-730bb7aa/'
  }, {
    name: 'Manuel Schüpbach',
    pic: this.getPicUrl('manuel.svg'),
    function1: 'Project Manager & Developer',
    function2: 'Software Developer, HF Bern',
    description: 'Der Projektleiter',
    link: 'https://www.linkedin.com/in/schuepbachbgpag/'

  }, {
    name: 'Dominique Gisin',
    pic: this.getPicUrl('dominique.svg'),
    function1: 'Marketing & Public Relations',
    function2: 'Physics, ETH Zürich',
    description: 'Der Star',
    link: 'http://dominiquegisin.ch/'
  }, {
    name: 'Marco Schlauri',
    pic: this.getPicUrl('marco.svg'),
    function1: 'Marketing & UX',
    function2: 'Communication, QUT Queensland',
    description: 'Der Kreative',
    link: 'https://www.linkedin.com/in/marco-schlauri/'
  }, {
    name: 'Wir suchen Dich!',
    pic: this.getPicUrl('portrait1.svg'),
    function1: 'Frontend Developer',
    function2: 'Degree in Computer Science',
    description: 'Die Neue',
    link: 'http://www.earlyhire.ch/job-details?id=6566'
  }];

  constructor() {
  }

  ngOnInit() {
  }

  getPicUrl(picEndpoint: string) {
    return `/assets/img/team/${picEndpoint}`;
  }
}
