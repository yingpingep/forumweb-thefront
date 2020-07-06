import { Injectable, QueryList } from '@angular/core';
import {
  StoredData,
  SaveResponse,
  RetriveResponse,
  Status,
} from 'src/app/models/stored-data';
import { Observable, of } from 'rxjs';
import { Question } from 'src/app/models';

@Injectable()
export class LocalStoredService implements StoredData {
  constructor() {}
  prepareAndSave(data: Question[]): Observable<SaveResponse> {
    localStorage.setItem('questions', JSON.stringify(data));

    return of({
      status: Status.Ok,
    });
  }
  retrive(): Observable<RetriveResponse> {
    let obj = JSON.parse(localStorage.getItem('questions')) as Question[];
    if (!obj) {
      obj = [];
    }

    return of({
      status: Status.Ok,
      data: obj,
    });
  }
}
