export interface Question {
  id: number;
  text: string;
}

export interface Aswers {
  questionId: number;
  id: string;
  text: string[];
}
