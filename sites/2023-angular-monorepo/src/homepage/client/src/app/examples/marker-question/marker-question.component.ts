import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Marker } from "@taskbase/marker";

@Component({
  selector: "app-marker-question",
  templateUrl: "./marker-question.component.html",
  styleUrls: ["./marker-question.component.scss"],
})
export class MarkerQuestionComponent implements OnInit {
  @Input() oldStudentInput: string;
  @Input() studentInput: string;
  @Input() markers: Marker[] = [];
  @Input() stimulus: string;
  @Input() editorStyles = {
    background: "#FFFFFF",
    padding: "7px",
    "font-family": `'Source Sans Pro', sans-serif`,
    "font-size": "20px",
    "min-height": "100px",
    outline: "0px solid transparent",
  };
  @Input() questionStyles = {
    color: "#FFFFFF",
    "margin-bottom": "15px",
  };
  @Output() changedText: EventEmitter<string> = new EventEmitter();

  editable: boolean;

  onMarkerTextChange(e: string) {
    this.changedText.emit(e);
  }

  constructor() {}

  ngOnInit() {}

  addMarker(offset: number, length: number) {
    this.markers = [
      ...this.markers,
      {
        length: length,
        offset: offset,
        styles: {
          background: "#F5606E",
        },
      },
    ];
  }

  clearMarker() {
    this.markers = [];
  }
}
