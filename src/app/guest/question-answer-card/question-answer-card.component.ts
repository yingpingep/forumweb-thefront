import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  Question,
  QuestionMode,
  AnswerOption,
  AnswerOptionType,
} from 'src/app/models';

@Component({
  selector: 'app-question-answer-card',
  templateUrl: './question-answer-card.component.html',
  styleUrls: ['./question-answer-card.component.scss'],
})
export class QuestionAnswerCardComponent implements OnInit {
  @ViewChildren('optionRefs') optionRefs: QueryList<ElementRef>;
  @Input() question: Question;
  get optionType() {
    return this.question.mode === QuestionMode.Single ? 'radio' : 'checkbox';
  }
  mode: Record<QuestionMode, string> = {
    [QuestionMode.Single]: '單選題',
    [QuestionMode.Multiple]: '多選題',
    [QuestionMode.Answer]: '簡答題',
  };

  questionMode = QuestionMode;
  answerOptionType = AnswerOptionType;
  answers: AnswerOption[] = [];
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  rollToFirst(event: Event) {
    window.scrollTo(0, 0);
  }

  answerTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.answers = [
      {
        index: 0,
        type: AnswerOptionType.Textinput,
        text: target.value,
      },
    ];
  }

  optionChange(clickedOption: AnswerOption) {
    const multiple = () => {
      const hasChecked =
        this.answers.filter((option) => option.index === clickedOption.index)
          .length === 1;
      const nativeEle = this.optionRefs.find(
        (ele) => ele.nativeElement.id === `option-label-${clickedOption.index}`
      ).nativeElement;
      if (hasChecked) {
        this.renderer.removeClass(nativeEle, 'active');
        this.answers = this.answers.filter(
          (option) => option.index !== clickedOption.index
        );
        return;
      }

      this.renderer.addClass(nativeEle, 'active');
      this.answers.push(clickedOption);
    };

    const single = () => {
      this.optionRefs.forEach((ele) => {
        if (ele.nativeElement.id !== `option-label-${clickedOption.index}`) {
          this.renderer.removeClass(ele.nativeElement, 'active');
        } else {
          this.renderer.addClass(ele.nativeElement, 'active');
        }
      });
      this.answers = [clickedOption];
    };

    if (this.question.mode === QuestionMode.Multiple) {
      multiple();
    } else {
      single();
    }
  }

  submit() {
    console.log(...this.answers);
  }
}
