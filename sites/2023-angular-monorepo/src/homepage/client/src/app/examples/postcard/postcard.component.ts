import { Component, OnInit } from "@angular/core";
import { AiService } from "../ai.service";

@Component({
  selector: "app-postcard",
  templateUrl: "./postcard.component.html",
  styleUrls: ["./postcard.component.scss"],
})
export class PostcardComponent implements OnInit {
  feedback: string;
  showFeedback: boolean;
  studentInput: string;

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.showFeedback = false;
  }

  check() {
    this.feedback = this.studentInput;
    this.showFeedback = true;
    this.feedback = "Einen Augenblick Geduld bitte.";

    if (this.studentInput === "" || this.studentInput === undefined) {
      this.feedback = "Gib doch etwas ein, dann macht es viel mehr Spass.";
    } else {
      this.aiService.spellCheckDe(this.studentInput).subscribe(() => {
        this.aiService
          .matchingFeedback(this.studentInput, "DE")
          .subscribe((resp) => {
            this.feedback = resp.feedback;
          });
      });
    }
  }
}
