import { Component, OnInit, ViewChild } from "@angular/core";
import { AiService } from "../ai.service";
import { MarkerQuestionComponent } from "../marker-question/marker-question.component";

@Component({
  selector: "app-matching",
  templateUrl: "./matching.component.html",
  styleUrls: ["./matching.component.scss", "../examples.base.scss"],
})
export class MatchingComponent implements OnInit {
  @ViewChild(MarkerQuestionComponent, { static: true })
  question: MarkerQuestionComponent;

  feedback: string;
  simulation: boolean;
  studentInput: string;
  updatedStudentInput: string;

  showAntworten: boolean;
  showWiederholen: boolean;

  studentSimulations = [
    {
      input: "Essen, Aufzählungen, Westküste",
    },
    {
      input: "architektonische Highlights, Anrede, chronologische Aufzählungen",
    },
    {
      input: "Hallo, Flurina, Wetter",
    },
  ];

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.studentInput = this.updatedStudentInput;
    this.showAntworten = true;
    this.showWiederholen = false;
    this.studentInput = "";
    this.feedback =
      'Da es sich hier um einen Show­case und nicht um eine "wirkliche" Aufgabe handelt,\n' +
      "können wir eine mögliche Schülereingabe simulieren.";
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

    this.feedback = "Einen Augenblick Geduld bitte.";
    this.simulation = false;

    if (this.studentInput === "") {
      this.feedback = "Gib doch etwas ein, dann macht es viel mehr Spass.";
    } else {
      this.aiService.spellCheckDe(this.studentInput).subscribe((resps) => {
        this.aiService
          .matchingFeedback(this.studentInput, "DE")
          .subscribe((resp) => {
            this.feedback = resp.feedback;
            this.showAntworten = false;
            this.showWiederholen = true;
          });
      });
    }
  }

  onChange(e: string) {
    this.updatedStudentInput = e;
  }
}
