import {Component, OnInit} from '@angular/core';
import {AiService} from '../ai.service';

@Component({
  selector: 'app-contentmatching',
  templateUrl: './contentmatching.component.html',
  styleUrls: ['./contentmatching.component.scss']
})
export class ContentmatchingComponent implements OnInit {

  feedback: string;
  simulation: boolean;
  studentInput: string;


  studentSimulations = [
    {
      input: 'Essen, Aufzählungen, Westküste'
    },
    {
      input: 'architektonische Highlights, Anrede, humorvoll'

    },
    {
      input: 'Hallo, Flurina, Wetter'
    }
  ];

  constructor(private aiService: AiService) {

    this.feedback = 'Da es sich hier um einen Show Case und nicht um eine "wirkliche" Aufgabe handelt,\n' +
      'können wir Ihnen eine Mögliche Schülereingabe Simulieren.';
    this.simulation = true;
    this.studentInput = '';

  }

  ngOnInit() {
  }

  simulate() {
    const newInput = this.studentSimulations[Math.floor(Math.random() * this.studentSimulations.length)].input;
    newInput !== this.studentInput ? this.studentInput = newInput : this.simulate();
  }

  check() {
    this.feedback = 'Einen Augenblick Geduld bitte.';
    this.simulation = false;

    if (this.studentInput === '') {
      this.feedback = 'Geben Sie doch etwas ein. Dann macht es viel mehr Spass.';
    } else {


      this.aiService.machingFeedback(this.studentInput).subscribe(resp => {
        this.feedback = resp.feedback;
      });
    }
  }

  onChange(e: string) {
    this.studentInput = e;
  }

}
