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
  AnswerOptionType,
  DisableButton,
} from 'src/app/models';
import { disableBtnObjFactory } from '../disable-button-helper';

@Component({
  selector: 'app-question-design-card',
  templateUrl: './question-design-card.component.html',
  styleUrls: ['./question-design-card.component.scss'],
})
export class QuestionDesignCardComponent implements OnInit, AfterViewInit {
  @ViewChild('questionTitleRef') questionTitleRef: ElementRef<HTMLInputElement>;
  @ViewChildren('optionInput') optionInputs: ElementRef<HTMLInputElement>[];
  @Input() questionData: Question;
  @Input() disableSendBtn: DisableButton;
  @Output() disableSendBtnChange = new EventEmitter<DisableButton>();
  @Output() removeQuestion = new EventEmitter<string>();
  @Output() sendQuestion = new EventEmitter<Question>();
  @Output() closeQuestion = new EventEmitter();
  get questionTitleInput() {
    return this.questionTitleRef.nativeElement;
  }
  questionMode = QuestionMode;
  mode = new BehaviorSubject<QuestionMode>(QuestionMode.Single);

  get isSnedBtnDisable() {
    const excludeId = this.disableSendBtn.excludeId;
    const disable = this.disableSendBtn.disable;
    if (!excludeId) {
      return disable;
    }

    return excludeId === this.questionData.id ? !disable : disable;
  }
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

  shouldShowOtherOption: boolean;

  answerType = AnswerOptionType;

  @Input() showCloseButton = false;

  private optionCount: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.optionList = this.questionData.answerOptions || [];
    this.shouldShowOtherOption = !!this.questionData.hasOtherOption;
    this.optionCount =
      this.optionList.length === 0
        ? 0
        : this.optionList.reduce((pre, curr) =>
            pre.index > curr.index ? pre : curr
          ).index + 1;
  }

  ngAfterViewInit(): void {
    this.setInputChecked(this.questionData.mode);
    this.questionTitleInput.value = this.questionData.title;
  }

  questionTitleChange() {
    this.questionData.title = this.questionTitleInput.value;
    this.disableSendBtnChange.emit(disableBtnObjFactory());
  }

  optionTitleChange(event: Event, index: number) {
    const option = this.optionList.find((v) => v.index === index);
    option.text = (event.target as HTMLInputElement).value;
    this.disableSendBtnChange.emit(disableBtnObjFactory());
  }

  sendToGuest() {
    this.sendQuestion.emit(this.questionData);
    this.showCloseButton = true;
  }
  addNewOption(type = AnswerOptionType.Predefined) {
    const newOption: AnswerOption = {
      index: this.optionCount++,
      type,
      text: type === AnswerOptionType.Textinput ? '其他' : '',
    };

    if (this.shouldShowOtherOption && type !== AnswerOptionType.Textinput) {
      const lastIndex = this.optionList.length - 1;
      this.optionList.splice(
        lastIndex,
        1,
        newOption,
        this.optionList[lastIndex]
      );
      return;
    }

    this.optionList.push(newOption);
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
    this.disableSendBtnChange.emit(disableBtnObjFactory());
  }

  removeQuestionClick() {
    this.removeQuestion.emit(this.questionData.id);
  }

  removeOptionClick(removeOptionIndex: number) {
    this.optionList = this.optionList.filter(
      (v) => v.index !== removeOptionIndex
    );
    this.questionData.answerOptions = this.optionList;
    this.disableSendBtnChange.emit(disableBtnObjFactory());
  }

  switchShowOtherOption() {
    this.shouldShowOtherOption = !this.shouldShowOtherOption;
    this.questionData.hasOtherOption = this.shouldShowOtherOption;

    if (this.shouldShowOtherOption) {
      this.addNewOption(AnswerOptionType.Textinput);
    } else {
      this.optionList = this.optionList.filter(
        (option) => option.type !== AnswerOptionType.Textinput
      );
      this.questionData.answerOptions = this.optionList;
    }
  }

  closeBtnClick() {
    this.showCloseButton = false;
    this.closeQuestion.emit();
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
