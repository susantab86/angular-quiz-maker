import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { question, quizCategory, quizQuestion } from './Shared/quizmaker.modal';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = environment.endpointApi;
  private quesURL = environment.getquestionApi;
  public temp: Array<question> = [];
  constructor(private http: HttpClient) {}
  sendCompData(data) {
    this.temp = data;
  }
  getCompData() {
    return this.temp;
  }
  getCategory(): Observable<quizCategory> {
    return this.http.get<quizCategory>(this.URL);
  }
  getQuestions(category: number, diff: string): Observable<quizQuestion> {
    const mainURL =
      this.quesURL +
      'amount=5&' +
      'category=' +
      category +
      '&difficulty=' +
      diff +
      '&type=multiple';
    return this.http.get<quizQuestion>(mainURL);
  }
}
