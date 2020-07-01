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
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  QuestionMode,
  QuestionConfig,
  AnswerOption,
  Question,
} from 'src/app/models';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit, AfterViewInit {
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
      Id: QuestionMode.Single,
      Text: '單選',
    },
    {
      Id: QuestionMode.Multiple,
      Text: '多選',
    },
    {
      Id: QuestionMode.Answer,
      Text: '簡答',
    },
  ];

  optionList: AnswerOption[];

  private optionCount = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.optionList = this.questionData.AnswerOptions || [];
  }

  ngAfterViewInit(): void {
    this.setInputChecked(this.mode.value);
  }

  questionTitleChange() {
    this.questionData.Title = this.questionTitleInput.value;
  }

  optionTitleChange(event: Event, index: number) {
    const option = this.optionList.find((v) => v.Index === index);
    option.Text = (event.target as HTMLInputElement).value;
  }

  addNewOption() {
    this.optionList.push({
      Index: this.optionCount++,
      Text: '',
    });
  }

  focusToNext(index: number) {
    const theInput = (this.optionInputs.find((_, i) => i === index + 1) || {})
      .nativeElement;

    if (theInput) {
      theInput.focus();
    }
  }

  questionModeInputClick(id: QuestionMode) {
    this.setInputChecked(id);
    this.switchModeTo(id);
  }

  removeQuestionClick() {
    this.removeQuestion.emit(this.questionData.Id);
  }

  removeOptionClick(removeOptionIndex: number) {
    this.optionList = this.optionList.filter(
      (v) => v.Index !== removeOptionIndex
    );
    this.questionData.AnswerOptions = this.optionList;
  }

  private switchModeTo(questionMode: QuestionMode) {
    this.mode.next(questionMode);
  }

  /**
   * Setup 'checked' attribute of the radio input elements.
   */
  private setInputChecked(id: QuestionMode) {
    this.questionConfigs
      .filter((v) => v.Id !== id)
      .forEach((v) =>
        this.renderer.removeAttribute(
          this.nativeElement.querySelector(`#${QuestionMode[v.Id]}`),
          'checked'
        )
      );
    this.renderer.setAttribute(
      this.nativeElement.querySelector(`#${QuestionMode[id]}`),
      'checked',
      ''
    );
  }
}
