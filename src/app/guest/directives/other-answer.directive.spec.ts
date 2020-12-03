import { OtherAnswerDirective } from './other-answer.directive';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mock-component',
  template: ` <button appOtherAnswer>aa</button> `,
})
class MockComponent {}

describe('OtherAnswerDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let mockHostDeEle: DebugElement;
  let mockHostEle: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent, OtherAnswerDirective],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      mockHostDeEle = fixture.debugElement.query(
        By.css('button[appOtherAnswer]')
      );
      mockHostEle = mockHostDeEle.nativeElement;
    })
  );

  it('should create an instance', () => {
    const directive = new OtherAnswerDirective();
    expect(directive).toBeTruthy();
  });

  it('should create a mock component with directive', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[appOtherAnswer]'))).toBeTruthy();
  });
});
