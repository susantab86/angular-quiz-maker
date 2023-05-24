import { Component, OnInit, Renderer2 } from '@angular/core';
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
export class QuizMakerCategoryComponent implements OnInit {
  public val: Array<string> = [];
  public quesresults: Array<question> = [];
  public btnOptions = [];
  public difficulties: difficulty[] = [];
  public category: category[] = [];
  public selectedCategory: category[] = [];
  public selecteddiffculty: difficulty[] = [];
  public categoryId: number = 0;
  public difficultyName: string = '';
  private subscriptions: Subscription[] = [];
  public isActive: boolean = false;
  public enableSubmit: boolean;
  constructor(
    private service: ApiService,
    private router: Router,
    private render: Renderer2
  ) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getCategory().subscribe((res) => {
        Object.values(res).forEach((val) => {
          this.category = val;
        });
      })
    );

    this.difficulties = [
      { name: 'Easy', code: 'E' },
      { name: 'medium', code: 'M' },
      { name: 'hard', code: 'H' },
    ];
  }
  selectCategoryId(val: number) {
    console.log(val);
    this.categoryId = val;
  }
  selecteDifficultyId(val: string) {
    console.log(val);
    this.difficultyName = val;
  }
  clickButton(event, parentIndex, childIndex) {
    console.log(event, parentIndex);
    this.quesresults[parentIndex].selectedAnsw = event;
    this.render.removeClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-outlined'
    );
    this.render.addClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-success'
    );
    console.log('quesresults', this.quesresults);
    this.checkEnable();
  }
  checkEnable() {
    this.enableSubmit = false;
    this.quesresults.forEach((ele) => {
      if (ele.selectedAnsw !== '') {
        this.enableSubmit = true;
      } else {
        this.enableSubmit = false;
      }
    });
  }
  submitButton() {
    this.router.navigate(['/results']);
    this.service.sendCompData(this.quesresults);
  }
  createQuestion() {
    console.log('click');
    this.quesresults = [];
    this.btnOptions = [];
    this.service
      .getQuestions(this.categoryId, this.difficultyName)
      .subscribe((res) => {
        this.quesresults = res['results'];
        this.quesresults.forEach((ele, indx, val) => {
          this.quesresults[indx].incorrect_answers.push(ele.correct_answer);
          this.quesresults[indx].selectedAnsw = '';
        });
      });
  }
}
