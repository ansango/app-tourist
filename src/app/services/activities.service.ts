import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, mergeAll, switchMap, toArray } from 'rxjs/operators';
import { Activity, MyActivity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private urlActivities = 'api/activities';
  private urlMyActivities = 'api/myActivities';
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

  getMyActivities(id?: number): Observable<MyActivity[]> {
    return this.http.get<MyActivity[]>(this.urlMyActivities).pipe(
      mergeAll(),
      filter((activity) => activity.userId == id),
      toArray()
    );
  }

  formatActivities(activities: any, id?: number) {
    return this.getMyActivities(id).subscribe((myActivities) => {
      activities.filter((activity: any) =>
        myActivities.find(
          (myActivity: any) => activity.id === myActivity.activityId
        )
      );
    });

    /*const _activities = activities;
    const myActivities = data;

    const sorted = _activities.filter((activity: any) =>
      myActivities.find(
        (myActivity: any) => activity.id === myActivity.activityId
      )
    );
    return sorted;*/
  }

  getFavorites(): Activity[] {
    return JSON.parse(localStorage.getItem('favorites')!) || [];
  }

  addFavorites(activity: Activity) {
    const activities = this.getFavorites();
    activities.push(activity);
    localStorage.setItem('favorites', JSON.stringify(activities));
  }

  deleteFavorite(id?: number) {
    const activities = this.getFavorites().filter((fav) => {
      return id !== fav.id;
    });
    localStorage.setItem('favorites', JSON.stringify(activities));
  }
}
