import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-questionthree',
  templateUrl: './questionthree.component.html',
  styleUrls: ['./questionthree.component.scss']
})
export class QuestionthreeComponent implements OnInit {

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


