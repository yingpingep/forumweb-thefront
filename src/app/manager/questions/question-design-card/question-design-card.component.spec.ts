import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDesignCardComponent } from './question-design-card.component';
import { Question, QuestionMode, DisableButton } from 'src/app/models';

describe('QuestionDesignCardComponent', () => {
  let component: QuestionDesignCardComponent;
  let fixture: ComponentFixture<QuestionDesignCardComponent>;
  const fakeQuestion: Question = {
    id: 'uuidV4()',
    number: '',
    title: '',
    mode: QuestionMode.Single,
    answerOptions: [],
  };
  const fakeDisableBtn: DisableButton = {
    disable: true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionDesignCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDesignCardComponent);
    component = fixture.componentInstance;
    component.questionData = fakeQuestion;
    component.disableSendBtn = fakeDisableBtn;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
