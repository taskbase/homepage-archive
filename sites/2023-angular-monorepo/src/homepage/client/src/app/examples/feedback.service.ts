import { Injectable } from "@angular/core";
import { AiService } from "./ai.service";
import { Observable, Observer } from "rxjs";
import { SpellingMistake } from "@taskbase/ai";

export enum Smiley {
  CONFUSED = "CONFUSED",
  SLEEPING = "SLEEPING",
  BRAVO = "BRAVO",
  OK = "OK",
  NOPE = "NOPE",
}

export interface Feedback {
  smiley: Smiley;
  text: string;
  mistakes: SpellingMistake[];
}

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(private aiService: AiService) {}

  spellCheckerEvaluation(input: string): Observable<Feedback> {
    return Observable.create((observer: Observer<Feedback>) => {
      // Please wait
      observer.next({
        smiley: Smiley.SLEEPING,
        text: "Einen Augenblick Geduld bitte.",
        mistakes: [],
      });

      // Empty input
      if (input === "") {
        observer.next({
          smiley: Smiley.CONFUSED,
          text: "Gib doch bitte etwas ein, dann macht es viel mehr Spass.",
          mistakes: [],
        });
      } else {
        this.aiService.spellCheckDe(input).subscribe(
          (resp) => {
            if (resp.mistakes.length === 0) {
              observer.next({
                smiley: Smiley.BRAVO,
                text: "Ich konnte keinen Fehler in deinem Text finden. Das ist sehr gut, weiter so!",
                mistakes: [],
              });
            } else if (resp.mistakes.length < 3) {
              observer.next({
                smiley: Smiley.OK,
                text: `Ich konnte ${resp.mistakes.length} Fehler finden. Das kannst du besser, auf zum nächsten Versuch.`,
                mistakes: resp.mistakes,
              });
            } else {
              observer.next({
                smiley: Smiley.NOPE,
                text: `Da haben sich einige Fehler eingeschlichen. Es sind ${resp.mistakes.length} in
              der Zahl. Das kannst du besser, auf zum nächsten Versuch.`,
                mistakes: resp.mistakes,
              });
            }
          },
          (errorResp) => {
            console.error(errorResp);
          }
        );
      }
    });
  }

  // Use map
  // singular
  getSmiley(smiley: Smiley) {
    const smileys = {
      [Smiley.NOPE]: "smiley1.png",
      [Smiley.OK]: "smiley2.png",
      [Smiley.BRAVO]: "smiley3.png",
      [Smiley.SLEEPING]: "smiley4.png",
      [Smiley.CONFUSED]: "smiley5.png",
    };
    return smileys[smiley];
  }
}
