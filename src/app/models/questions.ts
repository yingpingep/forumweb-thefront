export enum QuestionMode {
  Single,
  Multiple,
  Answer,
}
export interface Question {
  readonly Id: string;
  Number: string;
  Title: string;
  Mode: QuestionMode;
  AnswerOptions?: AnswerOption[];
}

export interface AnswerOption {
  /**
   * Index in question list.
   */
  Index: number;
  /**
   * Question title.
   */
  Text: string;
}

export interface QuestionConfig {
  Id: QuestionMode;
  /**
   * Display text.
   */
  Text: string;
}
