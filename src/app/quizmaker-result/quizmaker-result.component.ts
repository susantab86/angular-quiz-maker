import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quizmaker-result.component.html',
  styleUrls: ['./quizmaker-result.component.scss'],
})
export class QuizMakerResultComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {}
}
/*export class QuizMakerResultComponent implements OnInit {
  public nbatracker_threeLetterCode!: number;
  public nbatracker_dashBrdResult: Array<teamResults> = [];
  public nbatracker_squadDesc: TeamList | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nbatracker_threeLetterCode = +params['teamCode'];
      this.fetchResult(params['teamCode']);
      this.fetchSquadData(params['teamCode']);
    });
  }
  fetchResult(nbatracker_threeLetterCode: number) {
    const dateParams = this.apiService.fetchTrackTeam();
    this.apiService
      .fetchNBATrackerSquad(nbatracker_threeLetterCode, dateParams)
      .subscribe((res) => {
        this.nbatracker_dashBrdResult = res.data;
      });
  }
  fetchSquadData(nbatracker_threeLetterCode: number) {
    this.apiService
      .fetchFinalOutcome(nbatracker_threeLetterCode.toString())
      .subscribe((res) => {
        this.nbatracker_squadDesc = res;
      });
  }
  back() {
    window.history.back();
  }
}*/
