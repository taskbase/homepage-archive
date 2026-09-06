import {
  ActivationEnd,
  Router,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from "@angular/router";
import { LandingPageComponent } from "../pages/landing-page/landing-page.component";
import { ImpressumPageComponent } from "../pages/impressum-page/impressum-page.component";
import { TeamPageComponent } from "../pages/team-page/team-page.component";
import { NgModule } from "@angular/core";
import { CustomRouteReuseStrategy } from "./route-reuse-strategy";
import { PagesModule } from "../pages/pages.module";
import { SpellcheckPageComponent } from "../pages/spellcheck-page/spellcheck-page.component";
import { SummaryPageComponent } from "../pages/summary-page/summary-page.component";
import { PostcardPageComponent } from "../pages/postcard-page/postcard-page.component";
import { GrammarPageComponent } from "../pages/grammar-page/grammar-page.component";
import { GermanPageComponent } from "../pages/german-page/german-page.component";
import { MatchingPageComponent } from "../pages/matching-page/matching-page.component";
import { MatchingPageEnglishComponent } from "../pages/matching-page-english/matching-page-english.component";
import { TechnologyPageComponent } from "../pages/technology-page/technology-page.component";
import { filter } from "rxjs/operators";
import { HOMEPAGE_ROUTES } from "./homepage-routes";
import { GrammarEndPageComponent } from "../pages/grammar-end-page/grammar-end-page.component";
import { GrammarStandalonePageComponent } from "../pages/grammar-standalone-page/grammar-standalone-page.component";

export const HOMEPAGE_QUERY_PARAMS = {
  taskTitlePrefix: `task-title-prefix`,
};

export const appRoutes: Routes = [
  { path: HOMEPAGE_ROUTES.root, component: LandingPageComponent },
  { path: HOMEPAGE_ROUTES.impressum, component: ImpressumPageComponent },
  { path: HOMEPAGE_ROUTES.team, component: TeamPageComponent },
  { path: HOMEPAGE_ROUTES.technology, component: TechnologyPageComponent },
  {
    path: HOMEPAGE_ROUTES.examplesGrammarStandalone,
    component: GrammarStandalonePageComponent,
  },
  { path: HOMEPAGE_ROUTES.examplesGrammar, component: GrammarPageComponent },
  {
    path: HOMEPAGE_ROUTES.examplesGrammarEnd,
    component: GrammarEndPageComponent,
  },
  { path: HOMEPAGE_ROUTES.examplesGerman, component: GermanPageComponent },
  { path: HOMEPAGE_ROUTES.examplesMatching, component: MatchingPageComponent },
  {
    path: HOMEPAGE_ROUTES.examplesMatchingEnglish,
    component: MatchingPageEnglishComponent,
  },
  { path: HOMEPAGE_ROUTES.examplesPostcard, component: PostcardPageComponent },
  { path: HOMEPAGE_ROUTES.examplesSummary, component: SummaryPageComponent },
  {
    path: HOMEPAGE_ROUTES.examplesSpellcheck,
    component: SpellcheckPageComponent,
  },
  { path: "**", component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), PagesModule],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
})
export class AppRoutingModule {
  constructor(router: Router) {
    router.events
      .pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
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
