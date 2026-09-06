import { Component, OnInit, ViewChild } from "@angular/core";
import { Marker } from "@taskbase/marker";
import { HighlightQuestionComponent } from "../highlight-question/highlight-question.component";
import { editorStyles, questionStyles } from "../grammar/marker-editor-style";
import { AiService } from "../ai.service";
import { SpellingMistake, SpellCheckResponse, Sentence } from "@taskbase/ai";

@Component({
  selector: "app-grammar-standalone",
  templateUrl: "./grammar-standalone.component.html",
  styleUrls: ["../grammar/grammar.component.scss"],
})
export class GrammarStandaloneComponent implements OnInit {
  @ViewChild(HighlightQuestionComponent)
  questionThree: HighlightQuestionComponent;

  feedback: string;
  simulation: boolean;
  studentInput: string;
  updatedStudentInput: string;
  questionNr: number;
  oldStudentInput: string;
  markers: Marker[] = [];
  editorStyles = editorStyles;
  questionStyles = questionStyles;

  showAnswerButton: boolean;
  showNextButton: boolean;
  showRepeatButton: boolean;

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.feedback = ``;
    this.simulation = true;
    this.studentInput = "";
    this.updatedStudentInput = "";
    this.questionNr = 0;
    this.showAnswerButton = true;
    this.showNextButton = false;
    this.showRepeatButton = false;
  }

  check() {
    if (this.questionNr === 0) {
      this.evaluationQuestionOne();
    }
    if (this.questionNr === 1) {
      this.evaluationQuestionTwo();
    }
    if (this.questionNr === 2) {
      this.evaluationQuestionThree();
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

  next() {
    this.questionNr++;
    this.simulation = false;
    this.showAnswerButton = true;
    this.showRepeatButton = false;
    this.showNextButton = false;
    this.oldStudentInput = this.studentInput;
    this.studentInput = "";
    if (this.questionNr === 1) {
      this.feedback =
        "This task is rather simple. It should be possible to solve it without hints.";
    }
    if (this.questionNr === 2) {
      this.feedback =
        'When clicking on "Submit" your answer will be highlighted in red (wrong) and green (correct).';
    }
  }

  back() {
    this.showAnswerButton = true;
    this.showRepeatButton = false;
    this.showNextButton = false;
    this.feedback =
      "Please enter another sentence. Feel free to add errors on purpose to challenge the system.";
    if (this.questionNr === 2) {
      this.questionNr = 0;
    }
    this.ngOnInit();
  }

  onChange(e: string) {
    this.updatedStudentInput = e;
  }

  evaluationQuestionOne() {
    this.evaluateMarkerQuestion(this.simplePresentCheck.bind(this));
  }

  evaluationQuestionTwo() {
    this.evaluateMarkerQuestion(this.simplePastAndSimilarityCheck.bind(this));
  }

  private async evaluateMarkerQuestion(callback: () => void) {
    this.clearMarkers();
    this.studentInput = this.updatedStudentInput;
    if (this.studentInput === "") {
      this.feedback = "It is more fun if you enter a sentence.";
    } else {
      this.feedback = "One moment please.";
      try {
        const isEnglish = await this.isEnglishSentence();
        if (!isEnglish) {
          this.feedback = "Make sure to enter a complete English sentence.";
        } else {
          const mistakes = await this.getSpellingErrors();
          if (mistakes.length !== 0) {
            const firstMistake = mistakes[0];
            this.handleMistake(firstMistake);
          } else {
            this.clearMarkers();
            callback();
          }
        }
      } catch (e) {
        console.error(e);
        this.feedback = "Oops! Something went wrong.";
      }
    }
  }

  getSpellingErrors(): Promise<SpellingMistake[]> {
    return new Promise((resolve, reject) => {
      this.aiService
        .spellCheck(this.studentInput)
        .subscribe((resp: SpellCheckResponse) => {
          resolve(resp.mistakes);
        }, this.errorHandlerBuilder(reject));
    });
  }

  isEnglishSentence(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.aiService
        .partOfSpeechEnglishTokenizer(this.studentInput)
        .subscribe((posResp: Sentence[]) => {
          const dependencies: string[] = posResp[0].dependency!;
          const sums = {
            nominalSubject: this.countOccurrences(dependencies, "nsubj"),
            roots: this.countOccurrences(dependencies, "root"),
            clausalSubject: this.countOccurrences(dependencies, "csubj"),
          };
          resolve(
            sums.roots !== 0 && sums.nominalSubject + sums.clausalSubject !== 0
          );
        }, this.errorHandlerBuilder(reject));
    });
  }

  private countOccurrences(ary: string[], entry: string) {
    return ary.filter((elt) => elt === entry).length;
  }

  private errorHandlerBuilder(reject: (errorResp: any) => void) {
    return (errorResp: any) => {
      reject(errorResp);
    };
  }

  evaluationQuestionThree() {
    this.questionThree.doShowSolution();
    this.feedback = "Thanks for answering the questions. I hope you had fun.";
    this.simulation = false;
    this.showAnswerButton = false;
    this.showNextButton = false;
  }

  private handleMistake(mistake: SpellingMistake) {
    this.simulation = false;
    this.feedback = `Something is wrong near "${mistake.affected}". In order to make it possible to evaluate your sentence, we would appreciate if you could reformulate it.`;
    this.markers = this.buildMarkers(mistake.offset, mistake.affected.length);
  }

  private simplePresentCheck() {
    this.aiService.tenseCheck(this.studentInput).subscribe((resp) => {
      const tense = resp.tense;
      if (resp.tense === "SIMPLE_PRESENT") {
        this.handleSolvedCorrect();
      } else {
        this.handleWrongTense(tense);
      }
    });
  }

  private handleWrongTense(tense: string) {
    this.feedback = `Your sentence is in the wrong tense. Transform your sentence into the requested time, not "${this.getCleanTense(
      tense
    )}".`;
  }

  private handleSolvedCorrect() {
    this.simulation = false;
    this.feedback = `Well done! This seems to be a correct english sentence in the requested tense. Click on "Next" to move on to the next task.`;
    this.simulation = false;
    this.showAnswerButton = false;
    this.showNextButton = true;
  }

  private simplePastAndSimilarityCheck() {
    this.aiService.tenseCheck(this.studentInput).subscribe((resp) => {
      const tense = resp.tense;
      if (tense === "SIMPLE_PAST") {
        this.checkSimilarity();
      } else {
        this.handleWrongTense(tense);
      }
    });
  }

  private checkSimilarity() {
    this.aiService
      .getSimilarityScore(this.oldStudentInput, this.studentInput)
      .subscribe((resp) =>
        this.handleSimilarityResponse(resp.sentence_similarity)
      );
  }

  private handleSimilarityResponse(sentence_similarity: number) {
    if (sentence_similarity < 1) {
      this.simulation = false;
      this.feedback = `You worked on the wrong sentence. Please transform the previous sentence "${this.oldStudentInput}" into "simple past".`;
    } else {
      this.handleSolvedCorrect();
    }
  }

  private clearMarkers() {
    this.markers = [];
  }

  private getCleanTense(tense: string) {
    return tense.toLocaleLowerCase().replace("_", " ").replace("_", " ");
  }

  private buildMarkers(offset: number, length: number) {
    return [
      {
        length: length,
        offset: offset,
        styles: {
          background: "#F5606E",
        },
      },
    ];
  }
}
