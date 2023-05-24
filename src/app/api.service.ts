import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
//import { NBATracker_API_Const } from './Shared/nbatrackerConstants';
import { category, TeamListDeatils } from './Shared/nbatracker.modal';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = environment.endpointApi;
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get(this.URL);
  }
}
