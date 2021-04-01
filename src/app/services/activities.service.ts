import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, mergeAll, toArray } from 'rxjs/operators';
import { Activity, MyActivity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private urlActivities = 'api/activities';
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.urlActivities);
  }

  postActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(
      this.urlActivities,
      activity,
      this.httpOptions
    );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const url = `${this.urlActivities}/${activity.id}`;
    return this.http.put<Activity>(url, activity, this.httpOptions);
  }

  deleteActivity(id: number): Observable<{}> {
    const url = `${this.urlActivities}/${id}`;
    return this.http.delete<Activity>(url, this.httpOptions);
  }
}
