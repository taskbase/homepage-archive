import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AiService,
  Content,
  PlagiarismFeedback,
  VocabularyFeedback,
} from "../ai.service";
import { SpellCheckResponse, SpellingMistake } from "@taskbase/ai";

export interface Grading {
  grammar: number;
  spelling: number;
  diversity: number;
  content: number;
  feedback: Feedback[];
  errors: SpellCheckResponse;
}

export interface Feedback {
  valence: boolean;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class SummaryGradingService {
  constructor(private aiService: AiService) {}

  MIN_POINTS = 0;
  MAX_POINTS = 10;

  getGrading(textInput: string, referenceText: string): Observable<Grading> {
    const nWords = textInput.split(" ").length;
    return forkJoin([
      this.aiService.getVocabularyFeedback(textInput),
      this.aiService.spellCheckDe(textInput),
      this.aiService.getPlagiarismFeedback(textInput, referenceText),
      this.aiService.summaryContent(textInput),
    ]).pipe(
      map((results) => {
        const vocabularyFeedback = results[0];
        const spellCheckFeedback = results[1];
        const plariarismFeedback = results[2];
        const summaryContentFeedback = results[3];
        return {
          grammar: this.getGrammarScore(spellCheckFeedback, nWords),
          spelling: this.getSpellingScore(spellCheckFeedback, nWords),
          vocabulary: this.getVocabularyScore(vocabularyFeedback),
          diversity: this.getDiversityScore(
            vocabularyFeedback,
            plariarismFeedback,
            nWords
          ),
          content: this.getContentScore(summaryContentFeedback),
          feedback: this.composeFeedback(
            plariarismFeedback,
            summaryContentFeedback,
            spellCheckFeedback
          ),
          errors: spellCheckFeedback,
        };
      })
    );
  }

  private composeFeedback(
    plagiarismFeedback: PlagiarismFeedback,
    summaryContent: Content,
    spellCheckFeedback: SpellCheckResponse
  ): Feedback[] {
    const feedbacks: Feedback[] = [];
    if (plagiarismFeedback.percentage_copied > 0.2) {
      feedbacks.push({
        valence: false,
        description:
          "Du hast sehr viel vom Orginaltext übernommen. Schreibe in deinen eigenen Worten.",
      });
    }
    const contentFeedbacks: Feedback[] = this.composeContentFeedback(
      summaryContent.probabilities
    );

    const spellingFeedbacks = this.getFeedbackSpellcheck(
      spellCheckFeedback.mistakes.filter(
        (mistake) => mistake.mistakeType === "SPELLING"
      )
    );

    const grammarFeedbacks = this.getFeedbackSpellcheck(
      spellCheckFeedback.mistakes.filter(
        (mistake) => mistake.mistakeType === "GRAMMAR"
      )
    );

    let counter = 0;
    while (feedbacks.length < 3) {
      this.pushIfExists(feedbacks, contentFeedbacks[counter]);
      this.pushIfExists(feedbacks, grammarFeedbacks[counter]);
      this.pushIfExists(feedbacks, spellingFeedbacks[counter]);
      counter++;
    }
    if (feedbacks.length > 3) {
      return feedbacks.splice(0, 3);
    } else {
      return feedbacks;
    }
  }

  private getCombinedProbabilities(probabilities: number[]): number[] {
    return [
      Math.max(probabilities[0], probabilities[1]),
      Math.max(probabilities[2], probabilities[5]),
      Math.max(probabilities[3], probabilities[4]),
      Math.max(probabilities[6], probabilities[7]),
    ];
  }

  private composeContentFeedback(probabilities: number[]): Feedback[] {
    const probs = this.getCombinedProbabilities(probabilities);

    const topics = [
      "zum Mehrwert der neuen technologischen Möglichkeiten",
      "zu den übermässigen Ängsten gegenüber den Technologien",
      "zur drohenden Arbeitslosigkeit",
      "zu den Grenzen der besprochenen Technologien",
    ];

    const lowerCutoff = 0.05;
    const upperCutoff = 0.9;

    const feedbacks: Feedback[] = [];

    probs.forEach((prob, index) => {
      const topic = topics[index];
      const positiveFeedback = `Gut, hast du etwas ${topic} gesagt.`;
      const negativeFeedback = `Schön wäre gewesen, wenn du auch etwas ${topic} gesagt hättest.`;
      if (prob >= upperCutoff) {
        feedbacks.push({
          valence: true,
          description: positiveFeedback,
        });
      } else if (prob <= lowerCutoff) {
        feedbacks.push({
          valence: false,
          description: negativeFeedback,
        });
      }
    });
    return feedbacks;
  }

  private pushIfExists(listToAdd: any[], element: any) {
    if (element != null) {
      listToAdd.push(element);
    }
  }

  private getGrammarScore(
    spellCheckFeedback: SpellCheckResponse,
    nWords: number
  ): number {
    return this.trimPoints(
      10 *
        (0.1 -
          spellCheckFeedback.mistakes.filter(
            (mistake) => mistake.mistakeType === "GRAMMAR"
          ).length /
            nWords) *
        this.MAX_POINTS
    );
  }

  private getSpellingScore(
    spellCheckFeedback: SpellCheckResponse,
    nWords: number
  ): number {
    return this.trimPoints(
      10 *
        (0.1 -
          spellCheckFeedback.mistakes.filter(
            (mistake) => mistake.mistakeType === "SPELLING"
          ).length /
            nWords) *
        this.MAX_POINTS
    );
  }

  private getVocabularyScore(vocabularyFeedback: VocabularyFeedback): number {
    const depthRating =
      ((100 - (vocabularyFeedback.rating + 5)) * this.MAX_POINTS) / (29 - 5);
    return this.trimPoints(depthRating);
  }

  private getDiversityScore(
    vocabularyFeedback: VocabularyFeedback,
    plagiarismFeedback: PlagiarismFeedback,
    nWords: number
  ): number {
    const expectedAdjectiveFrequency = 0.05; // See http://infomotions.com/blog/2011/02/forays-into-parts-of-speech/

    const nUniqueAdj = vocabularyFeedback["n_unique_adjectives"];
    const nVerbs = vocabularyFeedback["n_verbs"];
    const nUniqueVerbs = vocabularyFeedback["n_unique_verbs"];

    const adjectiveRating =
      nWords !== 0
        ? this.trimPoints(
            (this.MAX_POINTS * nUniqueAdj) /
              (nWords * expectedAdjectiveFrequency)
          )
        : 0;
    const verbRating =
      nVerbs !== 0 ? (this.MAX_POINTS * nUniqueVerbs) / nVerbs : 0;

    const plariarismRating =
      this.MAX_POINTS *
      (1 -
        Math.max(this.MIN_POINTS, plagiarismFeedback.percentage_copied - 0.2) /
          0.8);
    return this.trimPoints(
      (adjectiveRating + verbRating + plariarismRating) / 3
    );
  }

  private getContentScore(summaryContent: Content): number {
    return this.trimPoints(
      (this.MAX_POINTS *
        this.getCombinedProbabilities(summaryContent.probabilities).reduce(
          (sum, current) => sum + current,
          0
        )) /
        4
    );
  }

  private trimPoints(points: number) {
    return Math.max(
      this.MIN_POINTS,
      Math.min(this.MAX_POINTS, Math.round(points))
    );
  }

  private mistakeMap = {
    COMMA: "Kommaregeln",
    Z_VS_TZ: "z und tz",
    I_VS_IE: "i und ie",
    H_VS_NO_H: "Dehnungs-h",
    CAPITALIZATION: "Gross- und Kleinschreibung",
    D_VS_T: "d und t",
    F_VS_PH: "f und ph",
    K_VS_CK: "k und ck",
    DOUBLE_CONSONANT: "Doppelkonsonanten",
    DOUBLE_VOWEL: "Doppelvokale",
    D_VS_DT: "d und dt",
    B_VS_P: "b und p",
    I_VS_Y: "i und y",
    S_VS_GERMAN_DOUBLE_S: "s und ss",
    E_VS_AE: "e und ä",
  };

  private getFeedbackSpellcheck(mistakes: SpellingMistake[]): Feedback[] {
    return this.groupAndSortByFrequency(
      mistakes
        .map((mistake) => this.mistakeMap[mistake.mistakeSubtype!])
        .filter((value) => value != null)
    ).map((rule) => {
      return {
        valence: false,
        description: `Sieh dir doch das Thema "${rule}" nochmals an.`,
      };
    });
  }

  private groupAndSortByFrequency(list: string[]): string[] {
    const frequencyMap = list.reduce((acc, curr) => {
      if (typeof acc[curr] == null) {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
    const uniqueEntries = new Set(list);
    return Array.from(uniqueEntries).sort(
      (a, b) => frequencyMap[a] - frequencyMap[b]
    );
  }
}
