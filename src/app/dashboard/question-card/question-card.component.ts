import { Component, OnInit, ViewChildren, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, AfterViewInit {

  @ViewChildren('singleInput') singleInputs: ElementRef<HTMLInputElement>[];
  @Input() questionData: Question;
  mode = new BehaviorSubject<QuestionMode>('single');
  nativeElement: Element;
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

  optionList: Option[] = [
    {
      index: 0,
      title: ''
    }
  ];

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.nativeElement = this.elementRef.nativeElement;
    this.questionData = {
      mode: this.mode.value,
      options: this.optionList
    };
  }

  ngAfterViewInit(): void {
    this._setInputChecked(this.mode.value);
  }

  optionTitleChange(event: Event, index: number) {
    const option = this.optionList.find((_, i) => i === index);
    option.title = (event.target as HTMLInputElement).value;
  }

  addNewOption() {
    this.optionList.push({
      index: this.optionList.length,
      title: ''
    });
  }

  focusToNext(index: number) {
    const theInput = (this.singleInputs.find((_, i) => i === index + 1) || {}).nativeElement;

    if (theInput) {
      theInput.focus();
    }
  }

  questionModeInputClick(id: string) {
    this._setInputChecked(id);
    this._switchModeTo(id as QuestionMode);
  }

  private _switchModeTo(questionMode: QuestionMode) {
    this.mode.next(questionMode);
  }

  private _updateQuestionData() {
    const currentMode = this.mode.value;
    this.questionData.mode = currentMode;
    this.questionData.options = currentMode === 'answer'
      ? undefined
      : this.optionList;
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
