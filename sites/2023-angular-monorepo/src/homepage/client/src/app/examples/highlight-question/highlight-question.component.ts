import { Component, Input, OnInit } from "@angular/core";
import { AiService } from "../ai.service";
import {
  GradedHighlightableToken,
  SimpleHighlightableToken,
} from "@taskbase/highlight";
import { Correctness, InPlaceSolutionType } from "@taskbase/lap-sdk-types";

@Component({
  selector: "app-highlight-question",
  templateUrl: "./highlight-question.component.html",
  styleUrls: ["./highlight-question.component.scss"],
})
export class HighlightQuestionComponent implements OnInit {
  @Input() studentInput: string;
  @Input() stimulus: string;
  @Input() oldStudentInput: string;
  @Input() questionStyles = {
    display: "block",
    width: "100%",
    "margin-bottom": "15px",
  };

  highlightColor = `#FDB643`;

  displayHighlightSolution = false;
  tokens: SimpleHighlightableToken[];
  solution: { correct: boolean }[];

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.studentInput = this.oldStudentInput;
    this.initializeTokens();
  }

  initializeTokens() {
    this.aiService
      .partOfSpeechEnglishTokenizer(this.studentInput)
      .subscribe((resp) => {
        const respTokens = resp[0].tokens;
        this.solution = respTokens.map((token, idx) => {
          return {
            correct: resp[0].posSimple[idx] === "VERB",
          };
        });
        this.tokens = resp[0].tokens.map((token) => {
          return {
            token: token,
            backgroundColor: null,
            isBold: false,
          };
        });
      });
  }

  onTokensChanged(e: SimpleHighlightableToken[]) {
    this.tokens = e;
  }

  doShowSolution() {
    this.displayHighlightSolution = true;
  }

  gradingSolution(token: SimpleHighlightableToken, solution: boolean) {
    if (token.backgroundColor == null && !solution) {
      return null;
    } else if (token.backgroundColor == null && solution) {
      return Correctness.WRONG;
    } else if (token.backgroundColor != null && solution) {
      return Correctness.CORRECT;
    }
    return Correctness.WRONG;
  }

  get gradedTokens(): GradedHighlightableToken[] {
    return this.tokens.map((token, idx) =>
      Object.assign({}, token, {
        correctColor: this.solution[idx].correct ? this.highlightColor : null,
        inplaceFeedback: {
          input: token.token,
          correctness: this.gradingSolution(token, this.solution[idx].correct),
          solution: {
            type: InPlaceSolutionType.HIGHLIGHT,
            solution: this.solution[idx].correct,
            token: {
              ...token,
              backgroundColor: this.solution[idx].correct
                ? this.highlightColor
                : null,
            },
          },
        },
      })
    ) as any;
  }
}
