import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ManipulateR } from 'src/app/utlis/manipulate-r.service';
import { QuestionMode, Question, AnswerOption } from 'src/app/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChildren('optionRefs') optionRefs: QueryList<ElementRef>;
  questionMode = QuestionMode;
  numberOfQuestion = 'Q1';
  question: Question = {
    Id: '1',
    Number: '0',
    Title: '測試用的題目 1234567',
    Mode: QuestionMode.Multiple,
    AnswerOptions: [
      {
        Index: 0,
        Text: 'A',
      },
      {
        Index: 1,
        Text: 'B',
      },
      {
        Index: 2,
        Text: 'C',
      },
      {
        Index: 3,
        Text: 'D',
      },
    ],
  };

  mode: Record<QuestionMode, string> = {
    [QuestionMode.Single]: '單選題',
    [QuestionMode.Multiple]: '多選題',
    [QuestionMode.Answer]: '簡答題',
  };

  answers: AnswerOption[] = [];

  get optionType() {
    return this.question.Mode === QuestionMode.Single ? 'radio' : 'checkbox';
  }
  constructor(private renderer: Renderer2, private mr: ManipulateR) {}

  ngOnInit(): void {
    this.mr.connectionToHub('https://localhost:5001/controlhub');
  }

  ngAfterViewInit() {}

  rollToFirst(event: Event) {
    window.scrollTo(0, 0);
  }

  answerTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.answers = [
      {
        Index: 0,
        Text: target.value,
      },
    ];
  }

  optionChange(option: AnswerOption) {
    const multiple = () => {
      const hasChecked =
        this.answers.filter((v) => v.Index === option.Index).length === 1;
      const nativeEle = this.optionRefs.find(
        (_, index) => index === option.Index
      ).nativeElement;
      if (hasChecked) {
        this.renderer.removeClass(nativeEle, 'active');
        this.answers = this.answers.filter((v) => v.Index !== option.Index);
        return;
      }

      this.renderer.addClass(nativeEle, 'active');
      this.answers.push(option);
    };

    const single = () => {
      this.optionRefs.forEach((item, index) => {
        if (index !== option.Index) {
          this.renderer.removeClass(item.nativeElement, 'active');
        } else {
          this.renderer.addClass(item.nativeElement, 'active');
        }
      });
      this.answers = [option];
    };

    if (this.question.Mode === QuestionMode.Multiple) {
      multiple();
    } else {
      single();
    }
  }

  submit() {
    console.log(...this.answers);
  }
}
