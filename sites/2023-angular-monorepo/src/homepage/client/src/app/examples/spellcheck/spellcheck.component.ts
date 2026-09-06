import { Component, OnInit, ViewChild } from "@angular/core";
import { AiService } from "../ai.service";
import { Feedback, FeedbackService } from "../feedback.service";
import { Observable } from "rxjs";
import { MarkerQuestionComponent } from "../marker-question/marker-question.component";
import { SpellingMistake } from "@taskbase/ai";

@Component({
  selector: "app-spellcheck",
  templateUrl: "./spellcheck.component.html",
  styleUrls: ["./spellcheck.component.scss", "../examples.base.scss"],
})
export class SpellcheckComponent implements OnInit {
  @ViewChild(MarkerQuestionComponent, { static: true })
  spellcheckquestion: MarkerQuestionComponent;

  title = "Rechtschreibung";

  spellCheckFeedback: Observable<Feedback>;

  studentInput: string;
  updatedStudentInput: string;

  simulation: boolean;
  showAnswerButton: boolean;
  showRepeatButton: boolean;

  studentSimulations = [
    {
      input:
        "Im Text handelt es sich um die Modernisierung von heutigen Arbeitsplätzen anhand von Maschienenersatz.",
    },
    {
      input:
        "Durch die Digitalisirung und den Aufschwung von Robotern und Maschinen können viele Arbeiten schneller," +
        " präziser und produktiver erledigt werden, als von einem Menschen. Aber es bringt auch Schatenseiten mit sich." +
        " Viele Arbeitsplätze gehen verloren und man fürchtet sich von einer Verselbststendigung der Computer.",
    },
    {
      input:
        "In diesem Text wird diskutiert, ob die Digitalisierung eine vorteilhafte oder bedrohliche Sache ist. Zum einen" +
        " erleichtert sie unser Alltagsleben, zum anderen vermiendert sie Arbeitsplätze. Des weiteren wird die frage angesprochen," +
        " ob Computer bzw. Roboter die Welt übernehmen können. Der Text sagt Nein. Denn Compputer haben, weniger Neuronen als der Mensch.",
    },
  ];

  constructor(
    private aiService: AiService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.simulation = true;
    this.studentInput = "";
    this.showAnswerButton = true;
    this.showRepeatButton = false;
    this.updatedStudentInput = "";
  }

  simulate() {
    const newInput: string =
      this.studentSimulations[
        Math.floor(Math.random() * this.studentSimulations.length)
      ].input;
    newInput !== this.studentInput
      ? (this.studentInput = newInput)
      : this.simulate();
    this.updatedStudentInput = this.studentInput;
  }

  changedText(e: string) {
    this.updatedStudentInput = e;
  }

  back() {
    this.spellcheckquestion.clearMarker();
    this.ngOnInit();
  }

  evaluate() {
    this.studentInput = this.updatedStudentInput;
    this.simulation = false;
    this.showAnswerButton = false;
    this.showRepeatButton = true;
    this.spellCheckFeedback = this.feedbackService.spellCheckerEvaluation(
      this.studentInput
    );
    this.spellCheckFeedback.subscribe((f) => {
      this.markMistakes(f.mistakes);
    });
  }

  private markMistakes(mistakes: SpellingMistake[]) {
    mistakes.forEach((mistake) => {
      this.spellcheckquestion.addMarker(
        mistake.offset,
        mistake.affected.length
      );
    });
  }
}
