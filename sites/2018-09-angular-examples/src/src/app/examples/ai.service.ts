import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AiService {

  constructor(private http: HttpClient) {
  }

  spellCheck(text: string) {
    const apiUrl = 'https://ai.taskbase.com/api/spell-check?lang=en';
    const reqBody = {text: text};
    return this.http.post<SpellCheckResponse>(apiUrl, reqBody);
  }

  tenseCheck(text: string) {
    const apiUrl = 'https://ai.taskbase.com/api/tense';
    const reqBody = {text: text, language: 'EN'};
    return this.http.post<TenseResponse>(apiUrl, reqBody);
  }

  sentenceSim(sentence1: string, sentence2: string) {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://nlp-models.taskbase.com/api/sentence-similarity';
    const reqBody = {sentence1: sentence1, sentence2: sentence2};
    return this.http.post<SentenceSimilarity>(apiUrl, reqBody);
  }


  machingFeedback(sentence1: string) {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://nlp-models.taskbase.com/api/word2vec';
    const reqBody = {feedback_request: sentence1};
    return this.http.post<MatchingFeedback>(apiUrl, reqBody);
  }

}

interface MatchingFeedback{
  feedback: string;
}

interface SentenceSimilarity {
  sentence_similarity: number;
}

interface TenseResponse {
  tense: string;
}

interface SpellCheckResponse {
  corrected: string;
  mistakes: {
    offset: number;
    affected: string;
    corrected: string;
    message: string;
    shortMessage: string;
    rule: string;
    checker: string;
  }[];
}


