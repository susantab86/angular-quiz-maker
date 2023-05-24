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
    console.log('quesresults', this.quesresults);
    this.checkEnable();
    //this.isActive = true;
    // for (let i = 1; i < 5; i++) {
    // }

    //console.log(event.target.id);
    //var bid = document.getElementById('Bt1').style.backgroundColor ='green'
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

        //console.log(res['question']);
        // Object.values(res).forEach((val) => {
        //   let arr = val;
        //   for (var key in arr) {
        //     console.log(key);
        //     this.quesresults.push(arr[key].question);
        //     this.btnOptions.push(arr[key].correct_answer);
        //     for (let i = 0; i < arr[key].incorrect_answers.length; i++) {
        //       this.btnOptions.push(arr[key].incorrect_answers[i]);
        //     }
        //   }
        // });
        //this.quesresults = res;
      });
    //this.router.navigate(['/results', this.categoryId, this.difficultyName]);
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
