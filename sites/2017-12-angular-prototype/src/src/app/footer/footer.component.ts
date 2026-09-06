import { Component, OnInit } from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ImpressumComponent} from '../impressum/impressum.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();

  constructor(
    private overlay: Overlay
  ) { }

  ngOnInit() {
  }

  openImpressum() {
    const overlayRef = this.overlay.create();
    const userProfilePortal = new ComponentPortal(ImpressumComponent);
    overlayRef.attach(userProfilePortal);
  }


}
