import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';
import { QuizContainerComponent } from './views/quiz/quiz-container/quiz-container.component';
import { QuizSectionComponent } from './views/quiz/quiz-section/quiz-section.component';

@NgModule({
  declarations: [QuizContainerComponent, QuizSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
