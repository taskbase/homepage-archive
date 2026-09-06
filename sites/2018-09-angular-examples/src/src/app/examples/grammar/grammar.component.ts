import {Component, OnInit} from '@angular/core';
import {AiService} from '../ai.service';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss']
})
export class GrammarComponent implements OnInit {

  feedback: string;
  simulation: boolean;
  studentInput: string;
  questionNr: number;
  oldStudentInput: string;

  showAntworten: boolean;
  showWeiter: boolean;


  studentSimulations = [
    {
      input: 'The blond girl plays very good football.'
    },
    {
      input: 'Tim is playing football.'
    },
    {
      input: 'An boy plays football.'
    }
  ];

  constructor(private aiService: AiService) {
  }

  ngOnInit() {
    this.feedback = 'Da es sich hier um einen Show Case und nicht um eine "wirkliche" Aufgabe handelt,\n' +
      'können wir Ihnen eine Mögliche Schülereingabe Simulieren.';
    this.simulation = true;
    this.studentInput = '';
    this.questionNr = 0;
    this.showAntworten = true;
    this.showWeiter = false;
  }

  simulate() {
    const newInput = this.studentSimulations[Math.floor(Math.random() * this.studentSimulations.length)].input;
    newInput !== this.studentInput ? this.studentInput = newInput : this.simulate();
  }

  check() {
    if (this.questionNr === 0) {this.evaluationQuestionOne();}
    if (this.questionNr === 1) {this.evaluationQuestionTwo();}
  }

  next() {
    this.questionNr++;
    this.oldStudentInput = this.studentInput;
    if (this.questionNr === 1) {this.feedback = 'Diese Aufgabe ist einfach uns sollte auch ohne Hilfe lösbar sein.';};
    if (this.questionNr === 2) {this.feedback = '';};
    this.simulation = false;
    this.showAntworten = true;
    this.showWeiter = false;

    if (this.questionNr === 2) {this.showAntworten = false;}
  }

  onChange(e: string) {
    this.studentInput = e;
  }

  evaluationQuestionOne() {
    this.feedback = 'Einen Augenblick Geduld bitte.';

    if (this.studentInput === '') {
      this.feedback = 'Geben Sie doch etwas ein. Dann macht es viel mehr Spass.';
    } else {

      // spell check
      this.aiService.spellCheck(this.studentInput).subscribe(resp => {
        if (resp.mistakes.length !== 0) {
          this.simulation = false;
          this.feedback = 'Rund um den Ausdruck \"' + resp.mistakes[0].affected + '\" scheint etwas nicht zu stimmen. ' +
            'Um den Satz auszuwerten, sind wir froh, wenn Sie diesen korrigieren oder umschreiben würden.';
        } else {

          // tense check
          this.aiService.tenseCheck(this.studentInput).subscribe(respt => {
            if (respt.tense === 'SIMPLE_PRESENT') {
              this.simulation = false;
              this.simulation = false;
              this.feedback = 'Super! Das scheint ein korrekter Englischer Satz in der gefragten Zeit zu sein. Klicken Sie auf' +
                ' weiter, um die nächste Aufgabe zu sehen.';
              this.simulation = false;
              this.showAntworten = false;
              this.showWeiter = true;
            } else {
              const cleanTense = respt.tense.toLocaleLowerCase().replace('_', ' ').replace('_', ' ');
              this.feedback = 'Ihr Satz ist in der falschen Zeit. Sie sollten den Satz ins \"simple present\" und nicht ins \"' + cleanTense
                + '\" transformieren. Versuche es noch einmal.';
            }
          });
        }
      }, errorResp => {
        console.error(errorResp);
      });
    }
  }

  evaluationQuestionTwo() {
    this.feedback = 'Einen Augenblick Geduld bitte.';

    if (this.studentInput === '') {
      this.feedback = 'Geben Sie etwas ein. Dann macht es viel mehr Spass.';
    } else {

      // spell check
      this.aiService.spellCheck(this.studentInput).subscribe(resp => {
        if (resp.mistakes.length !== 0) {
          this.simulation = false;
          this.feedback = 'Rund um den Ausdruck \"' + resp.mistakes[0].affected + '\" scheint etwas nicht zu stimmen. ' +
            'Um den Satz auszuwerten, sind wir froh, wenn Sie diesen korrigieren oder umschreiben würden.';
        } else {
          // tense check
          this.aiService.tenseCheck(this.studentInput).subscribe(respt => {
            if (respt.tense === 'SIMPLE_PAST') {
              // sim check
              this.aiService.sentenceSim(this.oldStudentInput, this.studentInput).subscribe(resps => {
                if (resps.sentence_similarity !== 1) {
                  this.simulation = false;
                  this.feedback = 'Bitte transformieren Sie den vorherigen Satz \"' + this.oldStudentInput +
                    '\" ins Past Simple. Nicht irgend einen Satz: Spassvogel!';
                } else {
                  this.simulation = false;
                  this.feedback = 'Super! Das scheint ein korrekter Englischer Satz in der gefragten Zeit zu sein. Klicken Sie auf' +
                    ' weiter, um die nächste Aufgabe zu sehen.';
                  this.simulation = false;
                  this.showAntworten = false;
                  this.showWeiter = true;
                }
              });
            } else {
              const cleanTense = respt.tense.toLocaleLowerCase().replace('_', ' ').replace('_', ' ');
              this.feedback = 'Ihr Satz ist in der falschen Zeit. Sie sollten den Satz ins \"simple past\" und nicht ins \"' + cleanTense
                + '\" transformieren. Versuche es noch einmal.';
            }
          });
        }
      }, errorResp => {
        console.error(errorResp);
      });
    }
  }

// initial feedback
// student input generate

// check
// if right -> feedback -> next enabled
// if wrong -> feedback -> feedback student right

}
