import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-techmodulnavbar',
  templateUrl: './techmodulnavbar.component.html',
  styleUrls: ['./techmodulnavbar.component.scss']
})

export class TechmodulnavbarComponent implements OnInit {

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
