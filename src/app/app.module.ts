import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ForbiddenNamesDirective } from './shared/directives/forbidden-names.directive';
import { AppRoutingModule } from './app-routing.module';
// import { QuizSectionComponent } from './views/quiz/quiz-section/quiz-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenNamesDirective,
    // QuizSectionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
