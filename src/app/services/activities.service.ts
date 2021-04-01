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
  private myActivitiesUrl = 'api/myActivities';
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.urlActivities);
  }

  getMyActivities(id: number): Observable<MyActivity[]> {
    return this.http.get<MyActivity[]>(this.myActivitiesUrl).pipe(
      mergeAll(),
      filter((activity) => activity.userId == id),
      toArray()
    );
  }

  postActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(
      this.urlActivities,
      activity,
      this.httpOptions
    );
  }
}
