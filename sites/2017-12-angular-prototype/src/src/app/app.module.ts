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
import {BlogModule} from './blog/blog.module';
import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './routing/routes.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuItemsComponent} from './navbar/menu-items/menu-items.component';
import {TeamPageComponent} from './team/team.component';
import {BusinessCardComponent} from './team/business-card/business-card.component';
import {TbModulesComponent} from './landing/tb-modules/tb-modules.component';
import {ModuleExampleComponent} from './landing/module-example/module-example.component';
import {BlaModuleComponent} from './landing/bla-module/bla-module.component';
import {BlubModuleComponent} from './landing/blub-module/blub-module.component';
import {BarfModuleComponent} from './landing/barf-module/barf-module.component';
import {BlabModuleComponent} from './landing/blab-module/blab-module.component';
import {ShowcasesComponent} from './landing/showcases/showcases.component';
import {CustomersComponent} from './landing/customers/customers.component';
import {TestimonialsComponent} from './landing/testimonials/testimonials.component';
import {ContactComponent} from './landing/contact/contact.component';
import {NewsletterService} from './landing/jumbo/newsletter.service';
import {HttpClientModule} from '@angular/common/http';
import {NotifyModule} from 'notify-angular';
import {ContactFormService} from './landing/contact/contact-form.service';
import {SidenavService} from './sidenav.service';
import {SellingpointComponent} from './landing/sellingpoint/sellingpoint.component';

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
    BlogModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifyModule.forRoot(),
    MatSidenavModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    JumboComponent,
    FooterComponent,
    ImpressumComponent,
    LandingComponent,
    PageNotFoundComponent,
    MenuItemsComponent,
    TeamPageComponent,
    BusinessCardComponent,
    TbModulesComponent,
    ModuleExampleComponent,
    BlaModuleComponent,
    BlubModuleComponent,
    BarfModuleComponent,
    BlabModuleComponent,
    ShowcasesComponent,
    CustomersComponent,
    TestimonialsComponent,
    ContactComponent,
    SellingpointComponent
  ],
  providers: [
    NewsletterService,
    ContactFormService,
    SidenavService
  ],
  entryComponents: [
    ImpressumComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
