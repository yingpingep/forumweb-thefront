import { Injectable, QueryList } from '@angular/core';
import {
  StoredData,
  SaveResponse,
  RetriveResponse,
} from 'src/app/types/stored-data';
import { Observable, of } from 'rxjs';

@Injectable()
export class LocalStoredService implements StoredData {
  constructor() {}
  prepareAndSave(data: Question[]): Observable<SaveResponse> {
    data.forEach((question, index) => {
      question.number = `${index}`;
    });

    localStorage.setItem('questions', JSON.stringify(data));

    return of({
      status: 'OK',
    });
  }
  retrive(): Observable<RetriveResponse> {
    let obj = JSON.parse(localStorage.getItem('questions')) as Question[];
    if (!obj) {
      obj = [];
    }

    return of({
      status: 'OK',
      data: obj,
    });
  }
}
