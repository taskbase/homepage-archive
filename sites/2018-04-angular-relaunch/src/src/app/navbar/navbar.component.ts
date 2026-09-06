import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  isMenuOpen = false;
  toggleMenu(e: Event) {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(e) {
    this.isMenuOpen = false;
  }
}
