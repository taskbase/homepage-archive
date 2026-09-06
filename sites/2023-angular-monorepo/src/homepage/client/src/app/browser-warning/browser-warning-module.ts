import { NgModule } from "@angular/core";
import { BrowserWarningComponent } from "./browser-warning.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [MatSnackBarModule],
  declarations: [BrowserWarningComponent],
  exports: [BrowserWarningComponent],
})
export class BrowserWarningModule {}
