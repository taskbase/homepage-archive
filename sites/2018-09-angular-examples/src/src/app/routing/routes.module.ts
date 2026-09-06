import {ActivationEnd, Router, RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LandingComponent} from '../landing/landing.component';
import {ImpressumComponent} from '../impressum/impressum.component';
import {TeamPageComponent} from '../team/team.component';
import {TechmodulComponent} from '../techmodul/techmodul.component';
import {CustomRouteReuseStrategy} from './route-reuse-strategy';
import 'rxjs/add/operator/filter';
import {ExamplesComponent} from '../examples/examples.component';
import {GrammarComponent} from '../examples/grammar/grammar.component';
import {ContentmatchingComponent} from '../examples/contentmatching/contentmatching.component';

export const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'team', component: TeamPageComponent},
  {path: 'technology/:id', component: TechmodulComponent},
  {path: 'examples', component: ExamplesComponent},
  {path: 'examples/grammar', component: GrammarComponent},
  {path: 'examples/matching', component: ContentmatchingComponent},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}
  ]
})
export class AppRoutingModule {
  constructor(router: Router) {
    router.events.filter(event => event instanceof ActivationEnd).subscribe((event: ActivationEnd) => {
      if (event.snapshot.fragment == null) {
        window.scroll(0, 0);
      } else {
        const elt = document.getElementById(event.snapshot.fragment);
        if (elt != null) {
          elt.scrollIntoView();
        }
      }
    });
  }
}
