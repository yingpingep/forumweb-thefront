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

export abstract class DataStoaredService {
  abstract prepareAndSave(data: Question[]): Observable<SaveResponse>;
  abstract retrive(): Observable<RetriveResponse>;
}
