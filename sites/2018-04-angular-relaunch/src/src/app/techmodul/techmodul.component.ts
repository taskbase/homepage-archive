import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-techmodul',
  templateUrl: './techmodul.component.html',
  styleUrls: ['./techmodul.component.scss']
})
export class TechmodulComponent implements OnInit {

  id: number;
  private sub: any;

  techs;

  constructor(private dataService: DataService, private route: ActivatedRoute) {

    this.techs = dataService.techs;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }
}
