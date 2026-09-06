import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { AppRoutingModule } from "./routing/routes.module";
import { SpinnerModule } from "@taskbase/spinner";
import { NotifyModule } from "@taskbase/toast";
import { BrowserWarningModule } from "./browser-warning/browser-warning-module";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../environments/environment";
import { UserModule } from "@taskbase/user";
import { TaskCoreModule } from "@taskbase/task/core";
import { TbtaskModule } from "@taskbase/task/tbtask";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifyModule,
    SpinnerModule.forRoot({
      primaryColor: "white",
      animation: "spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
    }),
    BrowserWarningModule,
    UserModule.forRoot({
      apiUrl: environment.lapApiRoot,
      logoutReroute: ["."],
      loginReroute: ["."],
      emailUnverifiedReroute: ["/email-not-verified"],
    }),
    TaskCoreModule.forRoot({
      apiUrl: environment.lapApiRoot,
    }),
    TbtaskModule.forRoot({
      highlightColor: "#FDB643",
    }),
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
