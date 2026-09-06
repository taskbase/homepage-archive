import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

export interface TeamMember {
  name: string;
  pic: string;
  description: string;
}

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCardComponent implements OnInit {

  @Input() teamMember: TeamMember;

  constructor() { }

  ngOnInit() {
  }

}
