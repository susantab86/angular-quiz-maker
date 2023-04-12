import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NbaScoreComponent } from './nbatracker-score.component';
import { NbaTeamResultComponent } from '../nbatracker-result/nbatracker-result.component';
import { BackButtonComponent } from '../Shared/components/backBtn/nbatracker-backBtn.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { NbatrackerScoreRoutingModule } from './nbatracker-score-routing.module';


@NgModule({
  imports: [
    CommonModule,    
    ButtonModule,
    DropdownModule,
    CardModule,
    AccordionModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SkeletonModule,
    NbatrackerScoreRoutingModule
  ],
  declarations: [
    NbaScoreComponent,
    NbaTeamResultComponent,
    BackButtonComponent
  ],
})
export class NbatrackerScoreAppModule {}
