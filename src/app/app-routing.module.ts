import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaScoreComponent } from './nbatracker-score/nbatracker-score.component';
import { NbaTeamResultComponent } from './nbatracker-result/nbatracker-result.component';

const routes: Routes = [
  { path: '', component:NbaScoreComponent },
  { path: 'results/:teamCode', component:NbaTeamResultComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
