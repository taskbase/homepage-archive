import { Component, Input, OnInit } from "@angular/core";
import { FeedbackService, Feedback, Smiley } from "../feedback.service";
import { Observable } from "rxjs";
import { SpellingMistake } from "@taskbase/ai";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
})
export class FeedbackComponent implements OnInit {
  @Input() title: string;
  @Input() feedback: Observable<Feedback>;

  smiley: Smiley;
  text: string;
  mistakes: SpellingMistake[];

  feedbackSpellingMistakes: string[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedback.subscribe((f) => {
      this.smiley = f.smiley;
      this.text = f.text;
      this.mistakes = f.mistakes;
    });
  }

  getSmiley() {
    return this.feedbackService.getSmiley(this.smiley);
  }

  printMistakes(mistake: SpellingMistake) {
    return `${mistake.affected}: ${mistake.mistakeSubtype}`;
  }
}
