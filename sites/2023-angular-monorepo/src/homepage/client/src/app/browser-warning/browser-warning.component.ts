import { Component, OnInit } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserBrowser, browserNoLongerSupported } from "./browser-support";

@Component({
  selector: "app-browser-warning",
  templateUrl: "./browser-warning.component.html",
  styleUrls: ["./browser-warning.component.scss"],
})
export class BrowserWarningComponent implements OnInit {
  userBrowser: UserBrowser = {
    name: this.deviceService.browser,
    version: this.deviceService.browser_version,
  };

  constructor(
    private deviceService: DeviceDetectorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.openSnackbarIfBrowserUnsuitable();
    });
  }

  openSnackbarIfBrowserUnsuitable() {
    if (this.userBrowser.name === "Unknown") {
      this.snackBar.open(
        "Your web browser is not supported. Please switch to another web browser such as Chrome, Firefox, Safari, Edge or Opera to enjoy the full functionality of this site.",
        "Dismiss",
        { panelClass: ["action-snackbar"] }
      );
    } else if (browserNoLongerSupported(this.userBrowser)) {
      this.snackBar.open(
        "Your web browser version is no longer supported. Please update your web browser to enjoy the full functionality of this site.",
        "Dismiss",
        { panelClass: ["action-snackbar"] }
      );
    }
  }
}
