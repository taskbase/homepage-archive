import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HOMEPAGE_QUERY_PARAMS } from "../../routing/routes.module";
import { HOMEPAGE_ROUTE_BUILDER } from "../../routing/homepage-routes";

@Component({
  selector: "app-grammar",
  templateUrl: "./grammar.component.html",
  styleUrls: ["./grammar.component.scss"],
})
export class GrammarComponent implements OnInit {
  questionNr = 0;
  readonly taskTitlePrefixQueryParam = HOMEPAGE_QUERY_PARAMS.taskTitlePrefix;
  private taskTitlePrefix: string | null = null;

  private inputTextStepOne = "";

  loading = false;

  get taskTitle() {
    if (this.taskTitlePrefix != null) {
      return `${this.taskTitlePrefix}:${this.questionNr}`;
    } else {
      return null;
    }
  }

  get description() {
    if (this.questionNr === 0) {
      return `PLEASE ENTER AN EXAMPLE SENTENCE INTO THE PROVIDED FIELD, WHICH DESCRIBES WHAT YOU CAN SEE IN THE PICTURE. USE THE SIMPLE PRESENT TENSE.`;
    } else if (this.questionNr === 1) {
      return `NOW, PLEASE TRANSFORM THE SENTENCE INTO THE PAST SIMPLE TENSE.

YOU ENTERED THE FOLLOWING SENTENCE: ${this.inputTextStepOne}`;
    }
  }

  get progressImagePath(): string {
    const progressImageBasePath = "/assets/img/grammar/progress-";
    if (this.questionNr === 0) {
      return progressImageBasePath + "left.svg";
    } else if (this.questionNr === 1) {
      return progressImageBasePath + "middle.svg";
    } else {
      return progressImageBasePath + "right.svg";
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const taskTitlePrefix = queryParams[HOMEPAGE_QUERY_PARAMS.taskTitlePrefix];
    if (taskTitlePrefix != null) {
      this.taskTitlePrefix = taskTitlePrefix;
    }
  }

  onNext() {
    if (this.questionNr < 1) {
      this.questionNr++;
      this.reload();
    } else {
      this.navigateToEndScreen();
    }
  }

  navigateToEndScreen() {
    this.router.navigate(HOMEPAGE_ROUTE_BUILDER.examplesGrammarEnd);
  }

  onRetry() {
    this.reload();
  }

  reload() {
    this.loading = true;
    // remove the task-by-title component from the DOM, such that it gets reloaded
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  onInputChange(input: string) {
    if (this.questionNr === 0) {
      this.inputTextStepOne = input;
    }
  }
}
