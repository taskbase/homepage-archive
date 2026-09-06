import {Component, Input, OnChanges, OnInit} from '@angular/core';

interface MenuItem {
  link: string;
  title: string;
}

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnChanges {

  @Input() alignment: string;
  style;
  buttonStyle;

  menuItems: MenuItem[] = [{
    link: 'team',
    title: 'Team'
  }, {
    link: 'blog',
    title: 'Blog'
  }];


  constructor() { }

  ngOnChanges() {
    // TODO: Use CSS instead of ngStyle
    this.style = {
      'flex-direction': this.alignment === 'vertical' ? 'column' : 'row'
    };
    this.buttonStyle = {};
    if (this.alignment === 'vertical') {
      this.buttonStyle.width = '100%';
    }
  }

}
