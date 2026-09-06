import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-questionone',
  templateUrl: './questionone.component.html',
  styleUrls: ['./questionone.component.scss']
})
export class QuestiononeComponent implements OnInit {

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
