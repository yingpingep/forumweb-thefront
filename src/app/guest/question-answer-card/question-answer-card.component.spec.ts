import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerCardComponent } from './question-answer-card.component';
import { Question, QuestionMode } from 'src/app/models';

describe('QuestionAnswerCardComponent', () => {
  let component: QuestionAnswerCardComponent;
  let fixture: ComponentFixture<QuestionAnswerCardComponent>;
  const fakeQuestion: Question = {
    id: 'uuidV4()',
    number: '1',
    title: '',
    mode: QuestionMode.Single,
    answerOptions: [],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnswerCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswerCardComponent);
    component = fixture.componentInstance;
    component.question = fakeQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
