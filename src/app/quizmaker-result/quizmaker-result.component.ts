import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public difficultyMode: string = '';
  public checkAns: boolean = false;
  public counter: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.result = this.apiService.getCompData();
    console.log('hi' + this.result);
    console.log(this.result);
    this.result.forEach((ele, indx, val) => {
      if (this.result[indx].selectedAnsw == this.result[indx].correct_answer) {
        this.counter++;
        console.log('counter ' + this.counter);
        this.checkAns = true;
      }
    });
  }
}
