import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
//import { NBATracker_API_Const } from './Shared/nbatrackerConstants';
import { TeamListDeatils } from './Shared/nbatracker.modal';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
}
