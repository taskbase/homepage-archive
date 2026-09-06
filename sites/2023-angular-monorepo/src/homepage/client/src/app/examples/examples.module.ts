import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplesComponent } from "./examples.component";
import { GrammarComponent } from "./grammar/grammar.component";
import { MatchingComponent } from "./matching/matching.component";
import { MatchingEnglishComponent } from "./matching-english/matching-english.component";
import { GermanComponent } from "./german/german.component";
import { SummaryComponent } from "./summary/summary.component";
import { MarkerModule } from "@taskbase/marker";
import { HighlightModule } from "@taskbase/highlight";
import { SpellcheckComponent } from "./spellcheck/spellcheck.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { MarkerQuestionComponent } from "./marker-question/marker-question.component";
import { HighlightQuestionComponent } from "./highlight-question/highlight-question.component";
import { PostcardComponent } from "./postcard/postcard.component";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { SpinnerModule } from "@taskbase/spinner";
import { NotifyModule } from "@taskbase/toast";
import { TextInputHighlightModule } from "angular-text-input-highlight";
import { TaskByTitleComponent } from "./task-by-title/task-by-title.component";
import { SafePipe } from "./safe.pipe";
import { GrammarEndComponent } from "./grammar/grammar-end/grammar-end.component";
import { GrammarStandaloneComponent } from "./grammar-standalone/grammar-standalone.component";
import { FeedbackModule } from "@taskbase/feedback";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkerModule.forRoot({}),
    NotifyModule,
    HighlightModule,
    ComponentsModule,
    SpinnerModule,
    TextInputHighlightModule,
    FeedbackModule,
  ],
  declarations: [
    ExamplesComponent,
    GrammarComponent,
    MatchingComponent,
    MatchingEnglishComponent,
    GermanComponent,
    SummaryComponent,
    SpellcheckComponent,
    FeedbackComponent,
    MarkerQuestionComponent,
    HighlightQuestionComponent,
    PostcardComponent,
    TaskByTitleComponent,
    SafePipe,
    GrammarEndComponent,
    GrammarStandaloneComponent,
  ],
  exports: [
    ExamplesComponent,
    SpellcheckComponent,
    GermanComponent,
    GrammarStandaloneComponent,
    GrammarComponent,
    GrammarEndComponent,
    MatchingComponent,
    MatchingEnglishComponent,
    PostcardComponent,
    SummaryComponent,
  ],
})
export class ExamplesModule {}
