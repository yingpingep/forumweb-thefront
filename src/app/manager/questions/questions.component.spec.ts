import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import { DataStoaredService } from 'src/app/models';
import { LocalStoredService } from '../services/local-stored.service';
import { ManagerR, MockManagerR } from 'src/app/utlis/manager-r.service';

describe('QuestionComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsComponent],
      providers: [
        {
          provide: DataStoaredService,
          useClass: LocalStoredService,
        },
        {
          provide: ManagerR,
          useClass: MockManagerR,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
