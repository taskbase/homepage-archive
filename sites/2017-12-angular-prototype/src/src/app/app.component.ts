import {Component, EventEmitter} from '@angular/core';
import {SidenavService} from './sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidenavState;

  constructor(
    private sidenavService: SidenavService
  ) {
    this.sidenavState = this.sidenavService.sidenavState;
  }


}
