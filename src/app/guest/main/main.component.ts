import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  numberOfQuestion = 'Q1';
  question: Question = {
    id: '1',
    title: '測試用的題目 1234567',
    mode: 'answer',
    answerOptions: [
      {
        index: 0,
        text: 'A',
      },
      {
        index: 1,
        text: 'B',
      },
      {
        index: 2,
        text: 'C',
      },
      {
        index: 3,
        text: 'D',
      },
    ],
  };

  mode: Record<QuestionMode, string> = {
    single: '單選題',
    multiple: '多選題',
    answer: '簡答題',
  };

  get optionType() {
    return this.question.mode === 'single' ? 'radio' : 'checkbox';
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  rollToFirst(event: Event) {
    window.scrollTo(0, 0);
  }
}
