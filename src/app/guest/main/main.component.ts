import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ManipulateR } from 'src/app/manipulate-r/manipulate-r';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChildren('optionRefs') optionRefs: QueryList<ElementRef>;
  numberOfQuestion = 'Q1';
  question: Question = {
    id: '1',
    number: '0',
    title: '測試用的題目 1234567',
    mode: 'multiple',
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

  answers: AnswerOption[] = [];

  get optionType() {
    return this.question.mode === 'single' ? 'radio' : 'checkbox';
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
        index: 0,
        text: target.value,
      },
    ];
  }

  optionChange(option: AnswerOption) {
    const multiple = () => {
      const hasChecked =
        this.answers.filter((v) => v.index === option.index).length === 1;
      const nativeEle = this.optionRefs.find(
        (_, index) => index === option.index
      ).nativeElement;
      if (hasChecked) {
        this.renderer.removeClass(nativeEle, 'active');
        this.answers = this.answers.filter((v) => v.index !== option.index);
        return;
      }

      this.renderer.addClass(nativeEle, 'active');
      this.answers.push(option);
    };

    const single = () => {
      this.optionRefs.forEach((item, index) => {
        if (index !== option.index) {
          this.renderer.removeClass(item.nativeElement, 'active');
        } else {
          this.renderer.addClass(item.nativeElement, 'active');
        }
      });
      this.answers = [option];
    };

    if (this.question.mode === 'multiple') {
      multiple();
    } else {
      single();
    }
  }

  submit() {
    console.log(...this.answers);
  }
}
