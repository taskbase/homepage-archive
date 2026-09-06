import { Component, OnInit } from '@angular/core';
import {SidenavService} from '../sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidenavState;

  constructor(
    private sidenavService: SidenavService
  ) {
    this.sidenavState = this.sidenavService.sidenavState;
  }

}
