import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  QuestionMode,
  QuestionConfig,
  AnswerOption,
  Question,
} from 'src/app/models';
import { ManagerR } from 'src/app/utlis/manipulate-r.service';

@Component({
  selector: 'app-question-design-card',
  templateUrl: './question-design-card.component.html',
  styleUrls: ['./question-design-card.component.scss'],
})
export class QuestionDesignCardComponent implements OnInit, AfterViewInit {
  @ViewChild('questionTitleRef') questionTitleRef: ElementRef<HTMLInputElement>;
  @ViewChildren('optionInput') optionInputs: ElementRef<HTMLInputElement>[];
  @Input() questionData: Question;
  @Output() removeQuestion = new EventEmitter<string>();
  get questionTitleInput() {
    return this.questionTitleRef.nativeElement;
  }
  questionMode = QuestionMode;
  mode = new BehaviorSubject<QuestionMode>(QuestionMode.Single);
  get nativeElement() {
    return this.elementRef.nativeElement;
  }
  questionConfigs: QuestionConfig[] = [
    {
      id: QuestionMode.Single,
      text: '單選',
    },
    {
      id: QuestionMode.Multiple,
      text: '多選',
    },
    {
      id: QuestionMode.Answer,
      text: '簡答',
    },
  ];

  optionList: AnswerOption[];

  private optionCount = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private mr: ManagerR
  ) {}

  ngOnInit(): void {
    this.optionList = this.questionData.answerOptions || [];
  }

  ngAfterViewInit(): void {
    this.setInputChecked(this.questionData.mode);
    this.questionTitleInput.value = this.questionData.title;

    const lastOption = this.questionData.answerOptions[
      this.questionData.answerOptions.length - 1
    ];
    this.optionCount = lastOption ? lastOption.index + 1 : 0;
  }

  questionTitleChange() {
    this.questionData.title = this.questionTitleInput.value;
  }

  optionTitleChange(event: Event, index: number) {
    const option = this.optionList.find((v) => v.index === index);
    option.text = (event.target as HTMLInputElement).value;
  }

  sendToGuest() {
    this.mr.sendQuestion(this.questionData).subscribe();
  }
  addNewOption() {
    this.optionList.push({
      index: this.optionCount++,
      text: '',
    });
  }

  focusToNext(index: number) {
    const theInput = (this.optionInputs.find((_, i) => i === index + 1) || {})
      .nativeElement;

    if (theInput) {
      theInput.focus();
    }
  }

  questionModeInputClick(questionMode: QuestionMode) {
    this.setInputChecked(questionMode);
    this.switchModeTo(questionMode);
    this.questionData.mode = questionMode;
  }

  removeQuestionClick() {
    this.removeQuestion.emit(this.questionData.id);
  }

  removeOptionClick(removeOptionIndex: number) {
    this.optionList = this.optionList.filter(
      (v) => v.index !== removeOptionIndex
    );
    this.questionData.answerOptions = this.optionList;
  }

  private switchModeTo(questionMode: QuestionMode) {
    this.mode.next(questionMode);
  }

  /**
   * Setup 'checked' attribute of the radio input elements.
   */
  private setInputChecked(questionMode: QuestionMode) {
    this.questionConfigs
      .filter((v) => v.id !== questionMode)
      .forEach((v) =>
        this.renderer.removeAttribute(
          this.nativeElement.querySelector(`#${QuestionMode[v.id]}`),
          'checked'
        )
      );
    this.renderer.setAttribute(
      this.nativeElement.querySelector(`#${QuestionMode[questionMode]}`),
      'checked',
      ''
    );
  }
}
