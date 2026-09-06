import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  activeTestimonial = 0;
  touched: boolean;

  testimonials = [
    {
      pic: this.buildPicUrl('enrico.png'),
      name: 'Enrico De Giorgi',
      role: 'Professor, Universität St. Gallen',
      sentence: 'Bei der Lernplattform ‘e-maths.ch’ hat Taskbase keine Wünsche offen gelassen. Ich kann mich auf dieses Team verlassen.'
    },
    {
      pic: this.buildPicUrl('jaime.png'),
      name: 'Jamie Oberle',
      role: 'Orell Füssli, Leiter e-Business',
      sentence: 'Taskbase brilliert mit Kompetenz, Herzlichkeit und fortschrittlichster Technologie.'
    },
    {
      pic: this.buildPicUrl('urs.png'),
      name: 'Urs Zellweger\n',
      role: 'Lehrer, Kantonsschule Stans',
      sentence: 'Die Plattform acadilly.com von Taskbase ist die einzige Schweizer Lernplattform' +
      ' die technologisch international mithalten kann.'
    }
  ];

  constructor() {
  }

  ngOnInit() {

    let counter = 0;
    const iterateWhileUntouched = () => {
      if (!this.touched) {
        this.activeTestimonial = counter++ % this.testimonials.length;
        setTimeout(() => {
          iterateWhileUntouched();
        }, 2500);
      }
    };
    iterateWhileUntouched();

  }

  setActiveTestimonial(val) {
    this.touched = true;
    this.activeTestimonial = (val >= 0) ? val % this.testimonials.length : this.testimonials.length - 1;
  }

  private buildPicUrl(logo: string) {
    return `/assets/img/testimonial/${logo}`;
  }

}
