import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenModeComponent } from './screen-mode.component';
import { screenModuleDeclarations } from './screen-mode.module';
import {
  ManipulateR,
  MockManipulateR,
} from 'src/app/utlis/manipulate-r.service';

describe('ScreenModeComponent', () => {
  let component: ScreenModeComponent;
  let fixture: ComponentFixture<ScreenModeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: screenModuleDeclarations,
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
    fixture = TestBed.createComponent(ScreenModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
