import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent {
  screenWidth: number = window.innerWidth;

  @HostListener("window:resize", ["$event"])
  onResize(event: UIEvent) {
    this.screenWidth = (<Window>event.target).innerWidth;
  }
}
