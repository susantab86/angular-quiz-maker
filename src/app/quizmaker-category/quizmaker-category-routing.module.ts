import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMakerResultComponent } from '../quizmaker-result/quizmaker-result.component';
import { QuizMakerCategoryComponent } from './quizmaker-category.component';

const routes: Routes = [
  {
    path: '',
    component: QuizMakerCategoryComponent,
  },
  { path: 'results', component: QuizMakerResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizmakerCategoryRoutingModule {}
