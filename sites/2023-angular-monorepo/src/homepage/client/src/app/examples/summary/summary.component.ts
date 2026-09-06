import { Component, OnInit, ViewChild } from "@angular/core";
import { MarkerQuestionComponent } from "../marker-question/marker-question.component";
import { Grading, SummaryGradingService } from "./summary-grading.service";
import { NotifyService } from "@taskbase/toast";
import { SpellingMistake } from "@taskbase/ai";

/* eslint-disable no-irregular-whitespace */

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss", "../examples.base.scss"],
})
export class SummaryComponent implements OnInit {
  @ViewChild(MarkerQuestionComponent, { static: true })
  summaryQuestion: MarkerQuestionComponent;

  private _input: string = "";
  changedInput: string = "";
  get input(): string {
    return this._input;
  }
  set input(input: string) {
    this._input = input;
    this.changedInput = input;
  }
  feedback: string;
  grading: Grading | null = null;
  isLoading: boolean = false;
  MAX_POINTS = this.gradingService.MAX_POINTS;

  awaitingFeedbackString = "Einen Augenblick Geduld bitte.";
  errorString = "Uups, da ist etwas schiefgelaufen.";
  emptyInputError = "Text darf nicht leer sein.";
  tooLongInputError = "Text ist zu lang.";
  tooShortInputError = "Text ist zu kurz.";

  summaryText = `Mittlerweile ist es ganz normal, im Internet einzukaufen, eine Ausbildung online zu absolvieren und mit einem
  Klick
  das Flugticket zu kaufen. Die Digitalisierung hat unzählige Alltagsanwendungen vereinfacht. Trotzdem machen
  sich
  viele Menschen Sorgen über die negativen Folgen. Denn so praktisch es ist, dass man Flugtickets nicht mehr an
  einem
  Schalter oder in einem Reisebüro kaufen muss, es bedeutet eben auch, dass der Verkäufer und die Beraterin
  überflüssig werden. Forscher der Universität Oxford haben in einer Studie herausgefunden, dass Maschinen in
  den
  nächsten zwölf Jahren 75 bis 375 Millionen menschliche Arbeitskräfte aus ihrem angestammten Job verdrängen
  werden.
  Davon betroffen dürfte vor allem die sogenannte Knowledge Economy sein, in der es um die Verarbeitung von
  Informationen geht. Algorithmen können Verträge lesen, medizinische Scans analysieren und Informationen für
  die
  Marktforschung sammeln  -  schneller, präziser und produktiver als der Mensch. In Filmen wird auch oft
  dargestellt,
  wie Computersysteme sich plötzlich verselbstständigen. Sie manipulieren Funktionen und mutieren zu
  unkontrollierbaren Killerrobotern, die die Menschheit bedrohen. Diese Gefahr ist nicht real: Die Anzahl der
  Neuronen im Hirn bestimmt die Möglichkeit des selbstständigen Denkens. Eine Qualle beispielsweise verfügt in
  ihrem
  Nervensystem über 5'700 Neuronen, eine Fruchtfliege über 250'000. Der Mensch dagegen hat 86 Milliarden
  Neuronen.
  Lediglich Elefanten haben mehr in ihrem Kopf als Menschen: 257 Milliarden Neuronen. Auch Computer verfügen
  über
  neuronale Netze. Deren Anzahl übersteigt aber die 90-Millionen-Marke noch nicht – oder anders: Der derzeit
  rechenstärkste Computer ist ungefähr so intelligent wie ein Goldhamster. Das zeigt: Maschinen stellen keine
  Bedrohung für den Menschen dar.`;

  currentExample: number = 0;
  simulatedStudentInputs = [
    `Die digitalisierung vereinfacht das heutige Leben sehr und wird in Zuckunft viele Berufe ersetzen werden, denn Maschienen sind in manchen Bereichen schneller präziser und produktiver als Menschen. Auch hat man Angst, Maschinen seien inteligenter als Menschen und stellen einen Gefahr für Menschen dar. Es wurde aber bewiesen dass Maschinen weniger Neuronen besitzen als Menschen und daher keine Gefahr besteht.`,
  ];

  constructor(
    private gradingService: SummaryGradingService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {}

  simulateInput() {
    this.currentExample =
      (this.currentExample + 1) % this.simulatedStudentInputs.length;
    this.input = this.simulatedStudentInputs[this.currentExample];
    this.grading = null;
  }

  evaluate() {
    this.input = this.changedInput;
    this.summaryQuestion.clearMarker();
    if (this.input.length === 0) {
      this.notifyService.error(this.emptyInputError);
    } else if (this.input.length >= 800) {
      this.notifyService.error(this.tooLongInputError);
    } else if (this.input.length < 100) {
      this.notifyService.error(this.tooShortInputError);
    } else {
      this.grading = null;
      this.isLoading = true;
      this.gradingService.getGrading(this.input, this.summaryText).subscribe(
        (grading) => {
          this.markMistakes(grading.errors.mistakes);
          this.grading = grading;
          this.isLoading = false;
        },
        (errorResp) => {
          this.notifyService.error(
            "Leider konnten wir deine Eingabe nicht auswerten."
          );
          this.isLoading = false;
        }
      );
    }
  }

  simulate() {}

  inputChange(input: string) {
    this.changedInput = input;
  }

  private markMistakes(mistakes: SpellingMistake[]) {
    mistakes.forEach((mistake) => {
      this.summaryQuestion.addMarker(mistake.offset, mistake.affected.length);
    });
  }
}
