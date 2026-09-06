import { Component, OnInit, ViewChild } from "@angular/core";
import { AiService } from "../ai.service";
import { MarkerQuestionComponent } from "../marker-question/marker-question.component";

@Component({
  selector: "app-matching-english",
  templateUrl: "./matching-english.component.html",
  styleUrls: ["./matching-english.component.scss", "../examples.base.scss"],
})
export class MatchingEnglishComponent implements OnInit {
  @ViewChild(MarkerQuestionComponent, { static: true })
  question: MarkerQuestionComponent;

  feedback: string;
  simulation: boolean;
  studentInput: string;
  updatedStudentInput: string;

  showSubmit: boolean;
  showRepeat: boolean;

  studentSimulations = [
    {
      input: "Food, enumerations, West Coast",
    },
    {
      input:
        "architectural highlights, salutation, chronological list of events",
    },
    {
      input: "Dear, Flurina, weather",
    },
  ];

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.studentInput = this.updatedStudentInput;
    this.showSubmit = true;
    this.showRepeat = false;
    this.studentInput = "";
    this.feedback =
      'Since this is a showcase and not a "real" task we can simulate a possible student input.';
    this.simulation = true;

    this.question.clearMarker();
  }

  simulate() {
    const newInput =
      this.studentSimulations[
        Math.floor(Math.random() * this.studentSimulations.length)
      ].input;
    newInput !== this.studentInput
      ? (this.studentInput = newInput)
      : this.simulate();
    this.updatedStudentInput = this.studentInput;
  }

  back() {
    this.ngOnInit();
  }

  check() {
    this.question.clearMarker();
    this.studentInput = this.updatedStudentInput;

    this.feedback = "One moment, please.";
    this.simulation = false;

    if (this.studentInput === "") {
      this.feedback = "It would be more fun if you could enter something, ok?";
    } else {
      this.aiService
        .matchingFeedback(this.studentInput, "EN")
        .subscribe((resp) => {
          this.feedback = resp.feedback;
          this.showSubmit = false;
          this.showRepeat = true;
        });
    }
  }

  onChange(e: string) {
    this.updatedStudentInput = e;
  }
}
