import { Observable } from 'rxjs';
import { Question } from './questions';

export enum MessageType {
  String,
  Image,
}

export type Message = {
  type: MessageType;
  content: any;
};

export type PageType = 'Chat' | 'Question' | 'KeyVision';

export interface ManipulateRBase {
  /**
   * Connect to SignalR hub.
   */
  connectionToHub(url: string): void;
  /**
   * Close the connection between hub.
   */
  closeConnection(): void;
  /**
   * Receive a question from hub.
   */
  receiveQuestion(): Observable<Question>;
  /**
   * Receive a message from hub.
   */
  receiveMessage(): Observable<Message>;
  /**
   * Send a message to hub.
   */
  sendMessage(message: Message): Observable<any>;
  /**
   * Receive a request which changes current page from hub.
   */
  receiveChangePage(): Observable<PageType>;
  /**
   * Should close current question.
   */
  questionClosed(): Observable<boolean>;
}

export interface ManagerFunc {
  /**
   * Send a question to hub.
   */
  sendQuestion(question: Question): Observable<any>;
  /**
   * Send a request which uses to change guest's current page to hub.
   */
  sendChangePage(page: PageType): Observable<any>;
  /**
   * Send a request to guest to close a displayed question.
   */
  closeQuestion(shouldClose: boolean): Observable<any>;
}
