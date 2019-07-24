import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.css']
})
export class QuizSectionComponent implements OnInit {

  @Input() questions;
  @Output() changeTriggered = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  changeRadioValue(question, value) {
    question.chosenAnswer = value;
    this.changeTriggered.next();
  }
}
