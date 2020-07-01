export enum QuestionMode {
  Single,
  Multiple,
  Answer,
}
export interface Question {
  readonly id: string;
  number: string;
  title: string;
  mode: QuestionMode;
  answerOptions?: AnswerOption[];
}

export interface AnswerOption {
  /**
   * Index in question list.
   */
  index: number;
  /**
   * Question title.
   */
  text: string;
}

export interface QuestionConfig {
  id: QuestionMode;
  /**
   * Display text.
   */
  text: string;
}
