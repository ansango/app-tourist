import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, MyActivity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private urlActivities = 'api/activities';
  private myActivitiesUrl = 'api/myActivities';
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.urlActivities);
  }

  getMyActivities(): Observable<MyActivity[]> {
    return this.http.get<MyActivity[]>(this.myActivitiesUrl);
  }
}
