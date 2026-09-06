import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ImpressumPageComponent } from "./impressum-page/impressum-page.component";
import { TeamPageComponent } from "./team-page/team-page.component";
import { TechnologyPageComponent } from "./technology-page/technology-page.component";
import { ExamplesPageComponent } from "./examples-page/examples-page.component";
import { GrammarPageComponent } from "./grammar-page/grammar-page.component";
import { GermanPageComponent } from "./german-page/german-page.component";
import { MatchingPageComponent } from "./matching-page/matching-page.component";
import { MatchingPageEnglishComponent } from "./matching-page-english/matching-page-english.component";
import { PostcardPageComponent } from "./postcard-page/postcard-page.component";
import { SummaryPageComponent } from "./summary-page/summary-page.component";
import { SpellcheckPageComponent } from "./spellcheck-page/spellcheck-page.component";
import { ComponentsModule } from "../components/components.module";
import { ExamplesModule } from "../examples/examples.module";
import { TeamModule } from "../team/team.module";
import { TechnologyModule } from "../technology/technology.module";
import { NavbarModule } from "../navbar/navbar.module";
import { LandingModule } from "../landing/landing.module";
import { FooterModule } from "../footer/footer.module";
import { ImpressumModule } from "../impressum/impressum.module";
import { GrammarEndPageComponent } from "./grammar-end-page/grammar-end-page.component";
import { GrammarStandalonePageComponent } from "./grammar-standalone-page/grammar-standalone-page.component";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ExamplesModule,
    TeamModule,
    TechnologyModule,
    NavbarModule,
    LandingModule,
    FooterModule,
    ImpressumModule,
  ],
  declarations: [
    LandingPageComponent,
    ImpressumPageComponent,
    TeamPageComponent,
    TechnologyPageComponent,
    ExamplesPageComponent,
    GrammarPageComponent,
    GermanPageComponent,
    MatchingPageComponent,
    MatchingPageEnglishComponent,
    PostcardPageComponent,
    SummaryPageComponent,
    SpellcheckPageComponent,
    GrammarEndPageComponent,
    GrammarStandalonePageComponent,
  ],
})
export class PagesModule {}
