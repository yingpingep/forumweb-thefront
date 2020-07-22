import { Injectable } from '@angular/core';
import { ManipulateR, MockManipulateR } from './manipulate-r.service';
import { ManagerFunc, Question, PageType } from '../models';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class ManagerR extends ManipulateR implements ManagerFunc {
  constructor() {
    super();
  }
  sendQuestion(question: Question): Observable<any> {
    return new Observable((subscriber) => {
      this.connection
        .invoke('SendQuestion', question)
        .then((returnValue) => subscriber.next(returnValue))
        .catch((error) => subscriber.error(error));
    }).pipe(take(1));
  }
  sendChangePage(page: PageType): Observable<any> {
    return new Observable((subscriber) => {
      this.connection
        .invoke('SendChangePage', page)
        .then((returnValue) => subscriber.next(returnValue))
        .catch((error) => subscriber.error(error));
    }).pipe(take(1));
  }

  closeQuestion(): Observable<any> {
    return new Observable((subscriber) => {
      this.connection
        .invoke('CloseQuestion', true)
        .then((returnValue) => subscriber.next(returnValue))
        .catch((error) => subscriber.error(error));
    }).pipe(take(1));
  }
}

export class MockManagerR extends MockManipulateR implements ManagerFunc {
  constructor() {
    super();
  }
  sendQuestion(question: Question): Observable<any> {
    return of();
  }
  sendChangePage(page: PageType): Observable<any> {
    return of();
  }
  closeQuestion(shouldClose: boolean): Observable<any> {
    return of();
  }
}
