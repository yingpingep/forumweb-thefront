import { Observable } from 'rxjs';
import { QueryList } from '@angular/core';

declare type Status = 'OK' | 'Error';
declare type SaveResponse = {
  status: Status;
};

declare type RetriveResponse = {
  status: Status;
  data: QueryList<Question>;
};

declare interface StoredData {
  save: (data: Question[]) => Observable<SaveResponse>;
  retrive: () => Observable<RetriveResponse>;
}
