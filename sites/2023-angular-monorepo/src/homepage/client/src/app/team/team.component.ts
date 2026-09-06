import { Component, OnInit } from "@angular/core";
import { TeamMember } from "./business-card/business-card.component";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: "Samuel Portmann",
      pic: this.getPicUrl("samuel.svg"),
      function1: "Founder & Business Developer",
      function2: "Business Innovation, HSG St. Gallen",
      description: "Der Drahtzieher",
      link: "https://www.linkedin.com/in/samuel-portmann-b532b27b/",
    },
    {
      name: "Alexa Bezel",
      pic: this.getPicUrl("alexa.svg"),
      function1: "Business Developer & Educational Expert",
      function2: "Business Innovation, HSG St. Gallen",
      description: "Die Didaktikerin",
      link: "https://www.linkedin.com/in/alexa-bezel-ab122663/",
    },
    {
      name: "Jost Joller",
      pic: this.getPicUrl("jost.svg"),
      function1: "Founder & Software Developer",
      function2: "Computer Science, ETH Zürich",
      description: "Der Architekt",
      link: "https://www.linkedin.com/in/jostjoller/",
    },
    {
      name: "Daniel Niederberger",
      pic: this.getPicUrl("daniel.svg"),
      function1: "Founder & Software Developer",
      function2: "Physics, ETH Zürich",
      description: "Der Hacker",
      link: "https://www.linkedin.com/in/daniel-niederberger-730bb7aa/",
    },
    {
      name: "Anette Hunziker",
      pic: this.getPicUrl("anette.svg"),
      function1: "Data Scientist & Developer",
      function2: "Neural Systems & Computation, ETH Zürich",
      description: "Der AI Guru",
      link: "https://www.linkedin.com/in/anette-hunziker/",
    },
    {
      name: "Jo Helmuth",
      pic: this.getPicUrl("jo.svg"),
      function1: "Team Lead Development",
      function2: "PhD in Computer Science, ETH Zürich",
      description: "Der Koordinator",
      link: "https://www.linkedin.com/in/jo-helmuth-5ba26a31/",
    },
    {
      name: "Kristian Brünn",
      pic: this.getPicUrl("kristian.svg"),
      function1: "Software Developer",
      function2: "Computer Science, TU Berlin und EPFL",
      description: "Der Coder",
      link: null,
    },
    // The svg still looks pretty bad because of the long hair, so wait for the correct one
    // {
    //   name: 'Atha Wirawati',
    //   pic: this.getPicUrl('atha.svg'),
    //   function1: 'Didactical Support',
    //   function2: 'VWL-Studentin Uni Zürich',
    //   description: 'Die Feedbackerin',
    //   link: 'https://www.linkedin.com/in/athalestari/'
    // }
  ];

  constructor() {}

  ngOnInit() {}

  getPicUrl(picEndpoint: string) {
    return `/assets/img/team/${picEndpoint}`;
  }
}
