import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {
  ManipulateR,
  MockManipulateR,
} from 'src/app/utlis/manipulate-r.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MainComponent],
        providers: [
          {
            provide: ManipulateR,
            useClass: MockManipulateR,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
