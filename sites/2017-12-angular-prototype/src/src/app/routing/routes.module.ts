import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LandingComponent} from '../landing/landing.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {ImpressumComponent} from '../impressum/impressum.component';
import {BlogComponent} from '../blog/blog/blog.component';
import {TeamPageComponent} from '../team/team.component';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'team', component: TeamPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
