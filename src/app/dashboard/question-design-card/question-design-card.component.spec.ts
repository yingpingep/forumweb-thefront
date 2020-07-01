import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDesignCardComponent } from './question-design-card.component';

describe('QuestionCardComponent', () => {
  let component: QuestionDesignCardComponent;
  let fixture: ComponentFixture<QuestionDesignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionDesignCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDesignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
