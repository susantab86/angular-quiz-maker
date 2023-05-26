import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { question } from '../Shared/quizmaker.modal';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quizmaker-result.component.html',
  styleUrls: ['./quizmaker-result.component.scss'],
})
export class QuizMakerResultComponent implements OnInit {
  public category: number = 0;
  public result: Array<question> = [];
  public checkAns: boolean = false;
  public counter: number = 0;

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.result = this.apiService.getCompData();
    this.getResult();
  }
  getResult() {
    this.result.forEach((ele, indx, val) => {
      if (this.result[indx].selectedAnsw == this.result[indx].correct_answer) {
        this.counter++;
        this.checkAns = true;
      }
    });
  }
  createNewQuiz() {
    this.router.navigate(['/']);
  }
}
