import {Component, OnInit} from '@angular/core';


const SWIPE_DISTANCE = 20;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  activeTestimonial = 0;
  mouseover = false;
  counter = 0;
  touchstartXPos: number;

  testimonials = [
    {
      pic: this.buildPicUrl('norbert_eh.png'),
      name: 'Norbert Hungerbühler\n',
      role: 'Professor, ETH Zürich',
      sentence: 'Taskbase entwickelt Lernplattformen auf höchstem technischem Niveau, die viel Potenzial für den Unterricht haben.'
    },
    {
      pic: this.buildPicUrl('jamie_eh.png'),
      name: 'Jaime Oberle\n',
      role: 'Leiter e-Business, Orell Füssli Verlag',
      sentence: 'Das Taskbase Team zeichnet sich durch die Entwicklung von Spitzentechnologie und einer herzlichen Zusammenarbeit aus.'
    },
    /*    {
          pic: this.buildPicUrl('barbara_eh.png'),
          name: 'Barbara Bitzi\n',
          role: 'Projekleiterin, Lehrmittelverlag St. Gallen',
          sentence: 'Mit Taskbase haben wir eine top Umsetzungspartnerin gefunden, die technisch und organisatorisch überzeugt.'
        },*/
    {
      pic: this.buildPicUrl('enrico_eh.png'),
      name: 'Enrico De Giorgi',
      role: 'Professor, Universität St. Gallen',
      sentence: 'Bei der Entwicklung der Lernplattform e-maths.ch hat die Zusammenarbeit mit Taskbase keine Wünsche offen gelassen.'
    },
    {
      pic: this.buildPicUrl('urs_eh.png'),
      name: 'Urs Zellweger\n',
      role: 'Lehrer, Kantonsschule Stans',
      sentence: 'Die Plattform Acadilly von Taskbase ist einzigartig in der Schweiz und kann technologisch auch international mithalten.'
    },
    {
      pic: this.buildPicUrl('rebekka_eh.png'),
      name: 'Rebecca Müller',
      role: 'Projektleiterin, Schule im Koffer',
      sentence: 'Der Support von Taskbase ist speditiv und freundlich. Unsere Wünsche wurden wie besprochen umgesetzt.'
    }
  ];

  constructor() {
    const iteratePicture = () => {
      setTimeout(() => {
        if (!this.mouseover) {
          this.activeTestimonial = this.counter++ % this.testimonials.length;
        }
        iteratePicture();
      }, 4000);
    };
    iteratePicture();
  }

  ngOnInit() {
  }


  mouseEnter() {
    this.mouseover = true;
  }

  mouseLeave() {
    this.mouseover = false;
  }

  setActiveTestimonial(val) {
    this.counter = val;
    this.activeTestimonial = (val >= 0) ? val % this.testimonials.length : this.testimonials.length - 1;
  }

  private buildPicUrl(logo: string) {
    return `/assets/img/testimonial/${logo}`;
  }

  onTouchstart(e: TouchEvent) {
    this.touchstartXPos = e.changedTouches.item(0).screenX;
  }

  onTouchend(e: TouchEvent) {
    const touchendXPos = e.changedTouches.item(0).screenX;
    const diff = touchendXPos - this.touchstartXPos;
    if (diff > SWIPE_DISTANCE) {
      this.setActiveTestimonial(this.activeTestimonial + 1);
    } else if (diff < SWIPE_DISTANCE) {
      this.setActiveTestimonial(this.activeTestimonial - 1);
    }
  }

}
