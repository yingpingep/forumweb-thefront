import { Observable } from 'rxjs';
import { Question } from './questions';

export enum Status {
  Ok,
  Error,
}
export type SaveResponse = {
  status: Status;
};

export type RetriveResponse = {
  status: Status;
  data: Question[];
};

export interface StoredData {
  prepareAndSave(data: Question[]): Observable<SaveResponse>;
  retrive(): Observable<RetriveResponse>;
}
