import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { QuizmakerCategoryRoutingModule } from './quizmaker-category-routing.module';
import { QuizMakerCategoryComponent } from './quizmaker-category.component';
import { QuizMakerResultComponent } from '../quizmaker-result/quizmaker-result.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    AccordionModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SkeletonModule,
    QuizmakerCategoryRoutingModule,
  ],
  declarations: [QuizMakerCategoryComponent, QuizMakerResultComponent],
})
export class QuizmakerCategoryAppModule {} 
