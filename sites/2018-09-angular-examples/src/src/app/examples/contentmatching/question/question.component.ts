import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() studentInput: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  doOnChange(e) {
    this.onChange.emit(e.target.value);
  }
}
