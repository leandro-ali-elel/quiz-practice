import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }
  mockData: QuizQuestion[] = [
    {
      id: 0,
      question: 'pregunta numero uno',
      chosenAnswer: null,
      answers: [{ id: 0, answer: 'opcion 1' }, { id: 1, answer: 'opcion 2' }]
    },
    {
      id: 1,
      question: 'pregunta numero dos',
      chosenAnswer: null,
      answers: [{ id: 0, answer: 'opcion 1' }, { id: 1, answer: 'opcion 2' }]
    },
    {
      id: 2,
      question: 'pregunta numero tres',
      chosenAnswer: null,
      answers: [{ id: 0, answer: 'opcion 1' }, { id: 1, answer: 'opcion 2' }]
    }
  ];

  getQuestions(): Observable<any> {
    return of(this.mockData).pipe(delay(1000));
  }

  getAnswers(questionSection): number[] {
    let answers = [];
    for (const key in questionSection) {
      if (key) {
        Array.from(questionSection[key]).forEach((question: QuizQuestion) => {
          answers = [...answers, question.chosenAnswer];
        });
      }
    }

    return answers;
  }
  separateQuestions(quizQuestions: QuizQuestion[], pageQuantity: number): { [id: number]: QuizQuestion[] } {
    const response: { [id: number]: QuizQuestion[] } = {};

    const responsePerPage = Math.round(quizQuestions.length / (pageQuantity || 1));
    let start = 0;
    let end = responsePerPage;

    for (let index = 1; index <= pageQuantity; index++) {
      response[index] = quizQuestions.slice(start, end);
      start += responsePerPage;
      end += responsePerPage;
    }
    return response;
  }
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
  chosenAnswer: number;
}

export interface QuizAnswer {
  id: number;
  answer: string;
}
