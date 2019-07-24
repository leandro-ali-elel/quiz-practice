import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { QuizQuestion, QuizService, QuizAnswer } from 'src/app/shared/quiz.service';
import { take, map, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizContainerComponent implements OnInit, OnDestroy {

  questions: QuizQuestion[];
  pagesQuantity = 2;
  questionSection: any = {};

  currentPage = 0;
  currentPage$ = new BehaviorSubject(this.currentPage);

  loading = true;
  isPageIncomplete = true;

  constructor(private quizService: QuizService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.quizService.getQuestions().pipe(
      take(1),
      map(allQuestions => this.quizService.separateQuestions(allQuestions, this.pagesQuantity)),
      finalize(() => this.loading = false)
    ).subscribe(sections => {
      this.questionSection = sections;
      this.cdr.markForCheck();
      this.nextPage();
    });

    this.currentPage$.subscribe(currentPage => {
      this.questions = this.questionSection[currentPage];
    });
  }

  nextPage() {
    this.currentPage++;
    this.currentPage$.next(this.currentPage);
  }

  backPage() {
    this.currentPage--;
    this.currentPage$.next(this.currentPage);
  }

  submitQuiz() {
    const answers = this.quizService.getAnswers(this.questionSection);
    console.log(answers);
  }

  checkIfAllIsAnswered() {
    this.isPageIncomplete = this.questions.some(question => question.chosenAnswer === null);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.currentPage$.unsubscribe();
  }
}
