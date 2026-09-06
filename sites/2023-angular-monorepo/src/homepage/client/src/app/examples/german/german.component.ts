import { Component, OnInit, ViewChild } from "@angular/core";
import { AiService } from "../ai.service";
import { MarkerQuestionComponent } from "../marker-question/marker-question.component";

@Component({
  selector: "app-german",
  templateUrl: "./german.component.html",
  styleUrls: ["./german.component.scss", "../examples.base.scss"],
})
export class GermanComponent implements OnInit {
  @ViewChild(MarkerQuestionComponent, { static: true })
  questionOne: MarkerQuestionComponent;

  feedback: string;
  simulation: boolean;
  studentInput: string;
  oldStudentInput: string;
  updatedStudentInput: string;

  showAnswerButton: boolean;
  showNextButton: boolean;
  showRepeatButton: boolean;

  studentSimulations = [
    {
      input: "Die Katzze des Mädchens ist grau.",
    },
    {
      input: "Das Auto des Mannes ist grün.",
    },
    {
      input: "Das Mädchen hat ein gelbes Kleid.",
    },
  ];

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.feedback =
      'Da es sich hier um einen Showcase und nicht um eine "wirkliche" Aufgabe handelt,\n' +
      "können wir eine mögliche Schülereingabe simulieren.";
    this.simulation = true;
    this.studentInput = "";
    this.oldStudentInput = this.studentInput;
    this.updatedStudentInput = this.studentInput;
    this.questionOne.clearMarker();
    this.showAnswerButton = true;
    this.showNextButton = false;
    this.showRepeatButton = false;
  }

  onChange(e: string) {
    this.updatedStudentInput = e;
  }

  // OPTIMIZE: This occurs in 4 classes, use a base class or compose
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

  check() {
    this.evaluationQuestionOne();
  }

  back() {
    this.ngOnInit();
    this.studentInput = this.updatedStudentInput;
    this.showAnswerButton = true;
    this.showRepeatButton = false;
    this.showNextButton = false;
    this.feedback =
      "Gib doch noch einmal etwas ein. Gerne kannst du auch Fehler einbauen und prüfen, ob das " +
      "System diese erkennen kann.";
    this.updatedStudentInput = this.studentInput;
  }

  evaluationQuestionOne() {
    this.studentInput = this.updatedStudentInput;
    this.feedback = "Einen Augenblick Geduld bitte.";

    if (this.studentInput === "") {
      this.feedback = "Gib doch etwas ein, dann macht es viel mehr Spass.";
    } else {
      this.aiService.spellCheckDe(this.studentInput).subscribe(
        (resp) => {
          this.handleSpellCheckDeResponse(resp);
        },
        (errorResp) => {
          console.error(errorResp);
        }
      );
    }
  }

  private handleSpellCheckDeResponse(spellCheckDeResponse: any) {
    if (spellCheckDeResponse.mistakes.length !== 0) {
      this.simulation = false;
      this.feedback =
        'Rund um den Ausdruck "' +
        spellCheckDeResponse.mistakes[0].affected +
        '" scheint etwas nicht zu stimmen. ' +
        "Um den Satz auszuwerten, sind wir froh, wenn du diesen korrigieren oder umschreiben würden.";

      this.questionOne.addMarker(
        spellCheckDeResponse.mistakes[0].offset,
        spellCheckDeResponse.mistakes[0].affected.length
      );
    } else {
      // check case
      this.questionOne.clearMarker();
      this.aiService.germanCase(this.studentInput).subscribe((resp) => {
        const casetemp: string[] = resp.pos_german.case;
        if (casetemp.includes("GENITIVE")) {
          // match content
          this.aiService
            .hasContent(this.studentInput)
            .subscribe((hasContentResp) =>
              this.handleHasContentResponse(hasContentResp)
            );
        } else {
          this.simulation = false;
          this.feedback =
            "Ich bin nur ein Computer. Leider. Aber ich kann keinen Genitiv in deinem Satz erkennen. Versuch es mit einem anderen Satz.";
          this.showAnswerButton = false;
          this.showRepeatButton = true;
        }
      });
    }
  }

  private handleHasContentResponse(resp: any) {
    this.simulation = false;
    this.showAnswerButton = false;
    this.showNextButton = true;
    this.showRepeatButton = true;
    if (resp.has_content) {
      this.feedback =
        "Das scheint ein korrekter deutscher Satz im Genitiv zu sein.";
    } else {
      this.feedback =
        `Ich bin mir nicht sicher, ob wir auf dem Bild dasselbe sehen.` +
        ` Aber es scheint ein korrekter deutscher Satz im Genitiv zu sein.`;
    }
  }
}
