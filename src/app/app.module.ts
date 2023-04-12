import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './api.interceptor';
import { ApiService } from './api.service';
import { CardModule } from 'primeng/card';
import { NbaScoreComponent } from './nbatracker-score/nbatracker-score.component';
import { NbaTeamResultComponent } from './nbatracker-result/nbatracker-result.component';
import { BackButtonComponent } from './Shared/components/backBtn/nbatracker-backBtn.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    NbaScoreComponent,
    NbaTeamResultComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    SkeletonModule,
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
