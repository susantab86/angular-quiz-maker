export interface difficulty {
  name: string;
  code: string;
}
export interface questions {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}
export interface category {
  id: number;
  name: string;
}
export interface quizCategory {
  data: Array<category>;
}

export interface question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
  selectedAnsw: string;
}
