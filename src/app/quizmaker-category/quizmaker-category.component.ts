import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { category, difficulty, question } from '../Shared/quizmaker.modal';

@Component({
  selector: 'app-quizmaker-category',
  templateUrl: './quizmaker-category.component.html',
  styleUrls: ['./quizmaker-category.component.scss'],
})
export class QuizMakerCategoryComponent implements OnInit, OnDestroy {
  public quesresults: Array<question> = [];
  public difficulties: difficulty[] = [];
  public category: category[] = [];
  public selectedCategory: category[] = [];
  public selecteddiffculty: difficulty[] = [];
  public categoryId: number = 0;
  public difficultyName: string = '';
  private subscriptions: Subscription[] = [];
  public isActive: boolean;
  public enableSubmit: boolean;
  public enableCounter: number = 0;
  constructor(
    private service: ApiService,
    private router: Router,
    private render: Renderer2
  ) {}
  ngOnInit(): void {
    this.getCategory();
    this.difficulties = [
      { name: 'Easy', code: 'E' },
      { name: 'medium', code: 'M' },
      { name: 'hard', code: 'H' },
    ];
  }
  getCategory() {
    this.subscriptions.push(
      this.service.getCategory().subscribe((res) => {
        this.category = res['trivia_categories'];
      })
    );
  }
  createQuestion() {
    if (this.categoryId != 0 && this.difficultyName != '') {
      this.subscriptions.push(
        this.service
          .getQuestions(this.categoryId, this.difficultyName)
          .subscribe((res) => {
            this.quesresults = res['results'];
            this.quesresults.forEach((ele, indx, val) => {
              this.quesresults[indx].incorrect_answers.push(ele.correct_answer);
              this.quesresults[indx].incorrect_answers = this.randomArray(
                this.quesresults[indx].incorrect_answers
              );
              this.quesresults[indx].selectedAnsw = '';
            });
          })
      );
    }
  }
  randomArray(array) {
    for (let k = array.length - 1; k > 0; k--) {
      const l = Math.floor(Math.random() * (k + 1));
      [array[k], array[l]] = [array[l], array[k]];
    }
    return array;
  }
  selectCategoryId(val: number) {
    this.categoryId = val;
  }
  selecteDifficultyId(val: string) {
    this.difficultyName = val;
  }
  clickButton(event, parentIndex, childIndex) {
    this.quesresults[parentIndex].selectedAnsw = event;
    for (let i = parentIndex; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        this.render.removeClass(
          document.getElementById('bt_' + parentIndex + '_' + j),
          'p-button-success'
        );
        this.render.addClass(
          document.getElementById('bt_' + parentIndex + '_' + j),
          'p-button-outlined'
        );
      }
    }
    this.render.removeClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-outlined'
    );
    this.render.addClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-success'
    );
    this.checkEnable();
  }

  checkEnable() {
    this.enableCounter = 0;
    this.enableSubmit = false;
    this.quesresults.forEach((ele) => {
      if (ele.selectedAnsw !== '') {
        this.enableCounter++;
        if (this.enableCounter == 5) {
          this.enableSubmit = true;
        }
      } else {
        this.enableSubmit = false;
      }
    });
  }
  submitButton() {
    this.router.navigate(['/results']);
    this.service.sendCompData(this.quesresults);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
