import {
  ManipulateRBase,
  ManagerFunc,
  Message,
  PageType,
} from '../types/manipulate-r';
import * as signalR from '@microsoft/signalr';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class ManipulateR implements ManipulateRBase {
  private connection: signalR.HubConnection;

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
    return of({
      id: 'null',
      number: 'null',
      title: 'null',
      mode: 'single',
    } as Question);
  }
  receiveMessage(): Observable<Message> {
    return of({
      type: 'String',
      content: 'null',
    } as Message);
  }
  sendMessage(message: Message): Observable<any> {
    return of(null);
  }
  receiveChangePage(): Observable<PageType> {
    return of('KeyVision' as PageType);
  }
}

@Injectable({
  providedIn: 'any',
})
export class ManagerR extends ManipulateR implements ManagerFunc {
  sendQuestion(question: Question): Observable<any> {
    return of(null);
  }
  sendChangePage(page: PageType): Observable<any> {
    return of(null);
  }
}
