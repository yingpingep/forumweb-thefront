declare type QuestionMode = 'single' | 'multiple' | 'answer';
declare interface Question {
  readonly id: string;
  title: string;
  mode: QuestionMode;
  answerOptions?: AnswerOption[];
}

declare interface AnswerOption {
  /**
   * Index in question list.
   */
  index: number;
  /**
   * Question title.
   */
  text: string;
}

declare interface QuestionConfig {
  id: QuestionMode;
  /**
   * Display text.
   */
  text: string;
}
