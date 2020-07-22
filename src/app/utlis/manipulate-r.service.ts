import {
  ManipulateRBase,
  Message,
  PageType,
  MessageType,
} from '../models/manipulate-r';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Question, QuestionMode } from '../models';

@Injectable({
  providedIn: 'any',
})
export class ManipulateR implements ManipulateRBase {
  protected connection: signalR.HubConnection;
  protected question$ = new Subject<Question>();
  protected message$ = new Subject<Message>();
  protected changePage$ = new Subject<PageType>();
  protected close$ = new Subject<boolean>();
  constructor() {}
  connectionToHub(url: string): void {
    if (this.connection) {
      return;
    }

    const builder = new signalR.HubConnectionBuilder();
    this.connection = builder.withUrl(url).build();

    this.connection.start().catch((err) => console.log(err));
  }
  closeConnection(): void {
    this.connection.stop().catch((err) => console.log(err));
  }
  receiveQuestion(): Observable<Question> {
    const callback = (question: Question) => {
      this.question$.next(question);
    };
    this.receiveWith('ReceiveQuestion', callback);
    return this.question$.asObservable();
  }
  receiveMessage(): Observable<Message> {
    const callback = (message: Message) => {
      this.message$.next(message);
    };
    this.receiveWith('ReceiveMessage', callback);
    return this.message$.asObservable();
  }
  receiveChangePage(): Observable<PageType> {
    const callback = (goPage: PageType) => {
      this.changePage$.next(goPage);
    };
    this.receiveWith('ReceiveChangePage', callback);
    return this.changePage$.asObservable();
  }
  sendMessage(message: Message): Observable<any> {
    return new Observable((subscriber) => {
      this.connection
        .invoke('SendMessage', message)
        .then((returnValue) => subscriber.next(returnValue))
        .catch((error) => subscriber.error(error));
    }).pipe(take(1));
  }

  questionClosed(): Observable<boolean> {
    const callback = (shouldClose: boolean) => {
      this.close$.next(shouldClose);
    };
    this.receiveWith('QuestionClosed', callback);
    return this.close$.asObservable();
  }
  private receiveWith(method: string, callback: (...args: any[]) => void) {
    this.connection.on(method, callback);
  }
}

export class MockManipulateR implements ManipulateRBase {
  connectionToHub(url: string): void {}
  closeConnection(): void {}
  receiveQuestion(): Observable<Question> {
    return of({
      id: '1',
      number: '1',
      title: '1',
      mode: QuestionMode.Answer,
    });
  }
  receiveMessage(): Observable<Message> {
    return of({
      type: MessageType.String,
      content: '',
    });
  }
  sendMessage(message: Message): Observable<any> {
    return of();
  }
  receiveChangePage(): Observable<PageType> {
    return of('Chat');
  }
  questionClosed(): Observable<boolean> {
    return of(true);
  }
}
