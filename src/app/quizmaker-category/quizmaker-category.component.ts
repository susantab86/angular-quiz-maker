import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { category, difficulty } from '../Shared/nbatracker.modal';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizmaker-category',
  templateUrl: './quizmaker-category.component.html',
  styleUrls: ['./quizmaker-category.component.scss'],
})
export class QuizMakerCategoryComponent implements OnInit {
  public val: Array<string> = [];
  public difficulties: difficulty[] = [];
  public category: category[] = [];
  public selectedCategory: category[] = [];
  public selecteddiffculty: difficulty[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private service: ApiService, private router: Router) {}
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
  selectcategoryid(val: number) {
    console.log(val);
  }
  createQuestion() {
    console.log('click');
  }
}

/*export class QuizMakerCategoryComponent implements OnInit {
  public nbatracker_listofteams: TeamList[] = [];
  public nbatracker_teamSelection!: TeamList;
  public nbatracker_selectedAllTeam: Array<TeamListDeatils> = [];
  public nbatracker_squadDes: Array<teamdetails> = [];
  public nbatracker_imgPath: string = ImgDetails_Const.imgURL;
  public nbatracker_imgType: string = ImgDetails_Const.fileType;
  constructor(private service: ApiService, private router: Router) {
    this.initData();
  }
  ngOnInit(): void {
    this.nbatracker_selectedAllTeam = this.service.selectedTeamList;
  }

  getNbaTrackerTeamData() {
    const pastTwlveDaysdates = this.service.fetchTrackTeam();
    const teamId = this.nbatracker_teamSelection.id;
    const unrepeatableTeam: boolean = this.uniqueTeam(
      this.nbatracker_selectedAllTeam,
      teamId
    );
    if (!unrepeatableTeam) {
      this.service.fetchNBATrackerSquad(teamId, pastTwlveDaysdates).subscribe((res) => {
        const fetchData = this.fetchScore(res.data, teamId);
        const teamData: any = this.nbatracker_teamSelection;
        teamData.results = fetchData.results;
        teamData.selfAvgScore = (
          fetchData.selfAvgScore / fetchData.results.length
        ).toFixed(2);
        teamData.opptAvgScore = (
          fetchData.opptAvgScore / fetchData.results.length
        ).toFixed(2);
        this.nbatracker_selectedAllTeam.push(teamData);
        this.service.selectedTeamList = this.nbatracker_selectedAllTeam;
      });
    }
  }

  private uniqueTeam(arr: Array<TeamListDeatils>, val: number) {
    return arr.some((arrVal) => val === arrVal.id);
  }

  private fetchScore(fetchData: any, selectedId: number) {
    let totalSelfScore = 0;
    let totalOpptScore = 0;
    fetchData.map((data: any) => {
      if (data.home_team.id == selectedId) {
        data['self_score'] = data.home_team_score;
        data['selfTeam'] = data.home_team.abbreviation;
        data['oppt_score'] = data.visitor_team_score;
        data['OpptTeam'] = data.visitor_team.abbreviation;
        totalSelfScore = totalSelfScore + data.home_team_score;
        totalOpptScore = totalOpptScore + data.visitor_team_score;
      } else if (data.visitor_team.id == selectedId) {
        data['self_score'] = data.visitor_team_score;
        data['selfTeam'] = data.visitor_team.abbreviation;
        data['oppt_score'] = data.home_team_score;
        data['OpptTeam'] = data.home_team.abbreviation;
        totalSelfScore = totalSelfScore + data.visitor_team_score;
        totalOpptScore = totalOpptScore + data.home_team_score;
      }
    });
    const retrunData = {
      selfAvgScore: totalSelfScore,
      opptAvgScore: totalOpptScore,
      results: fetchData,
    };
    return retrunData;
  }

  private initData() {
    this.service.teamList().subscribe((res) => {
      this.nbatracker_listofteams = res.data;
    });
  }
  remove(index: number) {
    this.nbatracker_selectedAllTeam.splice(index, 1);
    this.service.selectedTeamList = this.nbatracker_selectedAllTeam;
  }
  displayTracker_result(teamCode: any) {
    this.router.navigate(['/results', teamCode.id]);
  }
}*/
