import { Observable } from 'rxjs';

declare type MessageType = 'String' | 'Image';

declare type Message = {
  type: MessageType;
  content: any;
};

declare type PageType = 'Chat' | 'Question' | 'KeyVision';

declare interface ManipulateRBase {
  /**
   * Connect to SignalR hub.
   *
   * @memberof ManipulateRBase
   */
  connectionToHub(url: string): void;
  /**
   * Close the connection between hub.
   *
   * @memberof ManipulateRBase
   */
  closeConnection(): void;
  /**
   * Receive a question from hub.
   *
   * @returns {Observable<Question>}
   * @memberof ManipulateRBase
   */
  receiveQuestion(): Observable<Question>;
  /**
   * Receive a message from hub.
   *
   * @returns {Observable<Message>}
   * @memberof ManipulateRBase
   */
  receiveMessage(): Observable<Message>;
  /**
   * Send a message to hub.
   *
   * @param {Message} message
   * @returns {Observable<any>}
   * @memberof ManipulateRBase
   */
  sendMessage(message: Message): Observable<any>;
  /**
   * Receive a request which changes current page from hub.
   *
   * @returns {Observable<PageType>}
   * @memberof ManipulateRBase
   */
  receiveChangePage(): Observable<PageType>;
}

declare interface ManagerFunc {
  /**
   * Send a question to hub.
   *
   * @param {Question} question
   * @returns {Observable<any>}
   * @memberof ManagerFunc
   */
  sendQuestion(question: Question): Observable<any>;
  /**
   * Send a request which uses to change guest's current page to hub.
   *
   * @param {PageType} page
   * @returns {Observable<any>}
   * @memberof ManagerFunc
   */
  sendChangePage(page: PageType): Observable<any>;
}
