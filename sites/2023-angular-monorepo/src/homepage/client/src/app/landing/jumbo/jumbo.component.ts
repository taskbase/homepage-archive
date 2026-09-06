import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-jumbo",
  templateUrl: "./jumbo.component.html",
  styleUrls: ["./jumbo.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumboComponent {
  @Input() screenWidth: number;

  constructor() {}
}
