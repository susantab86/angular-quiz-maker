import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbaScoreComponent } from './nbatracker-score.component';
import { NbaTeamResultComponent } from '../nbatracker-result/nbatracker-result.component';



const routes: Routes = [
  {
    path: '',
    component: NbaScoreComponent,
  },
  { path: 'results/:teamCode', component:  NbaTeamResultComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbatrackerScoreRoutingModule {}