import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-questiontwo',
  templateUrl: './questiontwo.component.html',
  styleUrls: ['./questiontwo.component.scss']
})
export class QuestiontwoComponent implements OnInit {

  @Input() oldStudentInput: string;
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
