import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
  Renderer2,
  Input,
} from '@angular/core';
import { ManipulateR } from 'src/app/utlis/manipulate-r.service';
import { QuestionMode, Question, AnswerOption } from 'src/app/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  question: Question;
  constructor(private mr: ManipulateR) {}

  ngOnInit(): void {
    this.mr.connectionToHub('https://localhost:5001/controlhub');
  }

  ngAfterViewInit() {
    this.mr.receiveQuestion().subscribe((question) => {
      console.log(`🌻: MainComponent -> ngAfterViewInit -> question`, question);
      this.question = question;
    });

    this.mr.questionClosed().subscribe((shouldClose) => {
      if (shouldClose) {
        this.question = undefined;
      }
    });
  }
}
