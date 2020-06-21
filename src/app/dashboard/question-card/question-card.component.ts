import { Component, OnInit, ViewChildren, ElementRef, Renderer2, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, AfterViewInit {
  @ViewChild('questionTitleRef') questionTitleRef: ElementRef<HTMLInputElement>;
  @ViewChildren('optionInput') optionInputs: ElementRef<HTMLInputElement>[];
  @Input() questionData: Question;
  @Output() removeQuestion = new EventEmitter<string>();
  get questionTitleInput() {
    return this.questionTitleRef.nativeElement;
  }
  mode = new BehaviorSubject<QuestionMode>('single');
  get nativeElement() {
    return this.elementRef.nativeElement;
  }
  questionModes: QuestionConfig[] = [
    {
      id: 'single',
      text: '單選'
    },
    {
      id: 'multiple',
      text: '多選'
    },
    {
      id: 'answer',
      text: '簡答'
    }
  ];

  optionList: Option[];

  private _optionCount = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.optionList = this.questionData.options || [];
  }

  ngAfterViewInit(): void {
    this._setInputChecked(this.mode.value);
  }

  questionTitleChange() {
    this.questionData.title = this.questionTitleInput.value;
  }

  optionTitleChange(event: Event, index: number) {
    const option = this.optionList.find(v => v.index === index);
    option.title = (event.target as HTMLInputElement).value;
  }

  addNewOption() {
    this.optionList.push({
      index: this._optionCount++,
      title: ''
    });
  }

  focusToNext(index: number) {
    const theInput = (this.optionInputs.find((_, i) => i === index + 1) || {}).nativeElement;

    if (theInput) {
      theInput.focus();
    }
  }

  questionModeInputClick(id: string) {
    this._setInputChecked(id);
    this._switchModeTo(id as QuestionMode);
  }

  removeQuestionClick() {
    this.removeQuestion.emit(this.questionData.id);
  }

  removeOptionClick(removeOptionIndex: number) {
    this.optionList = this.optionList.filter(v => v.index !== removeOptionIndex);
    this.questionData.options = this.optionList;
  }

  private _switchModeTo(questionMode: QuestionMode) {
    this.mode.next(questionMode);
  }

  /**
   * Setup 'checked' attribute of the radio input elements.
   */
  private _setInputChecked(id: string) {
    this.questionModes.filter(v => v.id !== id).forEach(v =>
      this.renderer.removeAttribute(this.nativeElement.querySelector('#' + v.id), 'checked')
    );
    this.renderer.setAttribute(this.nativeElement.querySelector('#' + id), 'checked', '');
  }
}
