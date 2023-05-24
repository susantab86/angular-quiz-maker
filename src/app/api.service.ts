import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
//import { NBATracker_API_Const } from './Shared/nbatrackerConstants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = environment.endpointApi;
  private quesURL = environment.getquestionApi;

  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get(this.URL);
  }
  getQuestions(category: number, diff: string) {
    const mainURL =
      this.quesURL +
      'amount=5&' +
      'category=' +
      category +
      '&difficulty=' +
      diff +
      '&type=multiple';
    console.log(mainURL);
    return this.http.get(mainURL);
  }
}
