import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ComponentsModule} from './components/components.module';
import {JumboComponent} from './landing/jumbo/jumbo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatSidenavModule} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {ImpressumComponent} from './impressum/impressum.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './routing/routes.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamPageComponent} from './team/team.component';
import {BusinessCardComponent} from './team/business-card/business-card.component';
import {TbModulesComponent} from './landing/tb-modules/tb-modules.component';
import {ModuleExampleComponent} from './landing/module-example/module-example.component';
import {ShowcasesComponent} from './landing/showcases/showcases.component';
import {CustomersComponent} from './landing/customers/customers.component';
import {TestimonialsComponent} from './landing/testimonials/testimonials.component';
import {ContactComponent} from './landing/contact/contact.component';
import {NewsletterService} from './landing/jumbo/newsletter.service';
import {HttpClientModule} from '@angular/common/http';
import {NotifyModule} from 'ngx-toastytoast';
import {ContactFormService} from './landing/contact/contact-form.service';
import {StatesService} from './states.service';
import {DataService} from './data.service';
import {DummyComponent} from './landing/dummy/dummy.component';
import {ValuepropComponent} from './landing/valueprop/valueprop.component';
import {TechbodyComponent} from './landing/techbody/techbody.component';
import {ProjectComponent} from './landing/project/project.component';
import {OfferComponent} from './landing/offer/offer.component';
import {TechmodulnavbarComponent} from './techmodul/techmodulnavbar/techmodulnavbar.component';
import {TechmodulComponent} from './techmodul/techmodul.component';
import { SubscribeComponent } from './techmodul/subscribe/subscribe.component';

import { AgmCoreModule } from '@agm/core';
import { GooglmapsComponent } from './team/googlmaps/googlmaps.component';
import { AdressComponent } from './team/address/address.component';

@NgModule({
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    OverlayModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifyModule.forRoot(),
    MatSidenavModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCQb-uFPeVlA2BAVjSfwHUC48R6HHJ9IQY'
    })
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    JumboComponent,
    FooterComponent,
    ImpressumComponent,
    LandingComponent,
    PageNotFoundComponent,
    TeamPageComponent,
    BusinessCardComponent,
    TbModulesComponent,
    ModuleExampleComponent,
    ShowcasesComponent,
    CustomersComponent,
    TestimonialsComponent,
    ContactComponent,
    DummyComponent,
    ValuepropComponent,
    TechbodyComponent,
    ProjectComponent,
    OfferComponent,
    TechmodulnavbarComponent,
    TechmodulComponent,
    SubscribeComponent,
    GooglmapsComponent,
    AdressComponent
  ],
  providers: [
    NewsletterService,
    ContactFormService,
    StatesService,
    DataService
  ],
  entryComponents: [
    ImpressumComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
