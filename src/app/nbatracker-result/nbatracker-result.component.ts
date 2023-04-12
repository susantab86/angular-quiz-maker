import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { TeamList, teamResults } from '../Shared/nbatracker.modal';

@Component({
  selector: 'app-nba-team-result',
  templateUrl: './nbatracker-result.component.html',
  styleUrls: ['./nbatracker-result.component.scss'],
})
export class NbaTeamResultComponent implements OnInit {
  public nbatracker_threeLetterCode!: number;
  public nbatracker_dashBrdResult: Array<teamResults> = [];
  public nbatracker_squadDesc: TeamList | undefined;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nbatracker_threeLetterCode = +params['teamCode']; 
      this.fetchResult(params['teamCode']);
      this.fetchSquadData(params['teamCode']);
    });
  }
  fetchResult(nbatracker_threeLetterCode: number) {
    const dateParams = this.apiService.getParams();
    this.apiService.getTeam(nbatracker_threeLetterCode, dateParams).subscribe((res) => {
      this.nbatracker_dashBrdResult = res.data;
    });
  }
  fetchSquadData(nbatracker_threeLetterCode: number) {
    this.apiService.getTeamResult(nbatracker_threeLetterCode.toString()).subscribe((res) => {
      this.nbatracker_squadDesc = res;
    });
  }
}
