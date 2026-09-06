import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import {
  Language,
  LanguageDetectionResponse,
  Sentence,
  SpellCheckResponse,
  TenseDetectionRequest,
  TenseDetectionResponse,
} from "@taskbase/ai";

const apiRoot = environment.apiRoot;

@Injectable({
  providedIn: "root",
})
export class AiService {
  constructor(private http: HttpClient) {}

  spellCheck(text: string): Observable<SpellCheckResponse> {
    const apiUrl = `${apiRoot}/spell-check?lang=en`;
    const reqBody = { text: text };
    return this.http.post<SpellCheckResponse>(apiUrl, reqBody);
  }

  spellCheckDe(text: string): Observable<SpellCheckResponse> {
    const apiUrl = `${apiRoot}/spell-check?lang=de`;
    const reqBody = { text: text };
    return this.http.post<SpellCheckResponse>(apiUrl, reqBody);
  }

  germanCase(text: string) {
    const apiUrl = `${apiRoot}/pos-german`;
    const reqBody = { sentence: text };
    return this.http.post<any>(apiUrl, reqBody);
  }

  summaryContent(text: string) {
    const apiUrl = `${apiRoot}/summary-content`;
    const reqBody = {
      key: "EPFL_Aufgabe",
      summary: text,
    };
    return this.http.post<Content>(apiUrl, reqBody);
  }

  getStyleGrading(text: string) {
    const apiUrl = `${apiRoot}/grade-style`;
    const reqBody = {
      text: text,
    };
    return this.http.post<StyleGrading>(apiUrl, reqBody);
  }

  hasContent(text: string) {
    const apiUrl = `${apiRoot}/has-content`;
    const reqBody = {
      key: "content_prototype",
      sentence: text,
    };
    return this.http.post<any>(apiUrl, reqBody);
  }

  tenseCheck(text: string) {
    const apiUrl = `${apiRoot}/tense`;
    const reqBody: TenseDetectionRequest = {
      text: text,
      language: Language.EN,
    };
    return this.http.post<TenseDetectionResponse>(apiUrl, reqBody);
  }

  detectLanguage(text: string) {
    const apiUrl = `${apiRoot}/detect-language`;
    const reqBody = { text: text };
    return this.http.post<LanguageDetectionResponse>(apiUrl, reqBody);
  }

  getSimilarityScore(sentence1: string, sentence2: string) {
    const apiUrl = `${apiRoot}/sentence-similarity`;
    const reqBody = { sentence1: sentence1, sentence2: sentence2 };
    return this.http.post<SentenceSimilarity>(apiUrl, reqBody);
  }

  matchingFeedback(sentence1: string, language: string) {
    const apiUrl = `${apiRoot}/word2vec${language === "EN" ? "-english" : ""}`;
    const reqBody = { feedback_request: sentence1 };
    return this.http.post<MatchingFeedback>(apiUrl, reqBody);
  }

  getVocabularyFeedback(text: string): Observable<VocabularyFeedback> {
    const apiUrl = `${apiRoot}/vocabulary-measurer`;
    const reqBody = { document: text };
    return this.http.post<VocabularyFeedback>(apiUrl, reqBody);
  }

  getPlagiarismFeedback(text: string, referenceText: string) {
    const apiUrl = `${apiRoot}/summary-plagiarism`;
    const reqBody = { text: text, reference_text: referenceText };
    return this.http.post<PlagiarismFeedback>(apiUrl, reqBody);
  }

  partOfSpeechEnglishTokenizer(sentence: string) {
    const apiUrl = `${apiRoot}/tokenize`;
    const reqBody = {
      text: sentence,
      language: "EN",
    };
    return this.http.post<Sentence[]>(apiUrl, reqBody);
  }

  partOfSpeechGermanTokenizer(sentence: string) {
    const apiUrl = `${apiRoot}/tokenize`;
    const reqBody = {
      text: sentence,
      language: "DE",
    };
    return this.http.post<Sentence[]>(apiUrl, reqBody);
  }
}

export interface Content {
  feedback: string;
  n_pos: number;
  probabilities: number[];
}

interface MatchingFeedback {
  feedback: string;
}

export interface VocabularyFeedback {
  rating: number;
  feedback: string;
  words: string[];
  unique: number;
}

interface SentenceSimilarity {
  sentence_similarity: number;
}

export interface PlagiarismFeedback {
  percentage_copied: number;
}

interface StyleGrading {
  grading: StyleGradingProperties;
}

export interface StyleGradingProperties {
  present_frequency: number;
  passive_frequency: number;
  long_sentence_instances: number;
  complicated_word_counter: number;
}
