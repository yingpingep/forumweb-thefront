import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  question: Question = {
    id: '1',
    title: '測試用的題目 1234567',
    mode: 'multiple',
    options: [
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
  constructor() {}

  ngOnInit(): void {}
}
