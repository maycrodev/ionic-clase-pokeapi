interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  interface TriviaResponse {
    response_code: number;
    results: Question[];
  }