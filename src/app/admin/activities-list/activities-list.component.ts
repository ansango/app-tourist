import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMyActivities } from 'src/app/activities/state/activities.actions';
import { getMyActivities } from 'src/app/activities/state/activities.selectors';
import { getAdminId } from 'src/app/auth/state/auth.selectors';
import { Activity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  userId$!: Observable<number | null>;
  myActivities$!: Observable<Activity[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.myActivities$ = this.store.select(getMyActivities);
    //this.store.dispatch(loadMyActivities());
    //this.userId$ = this.store.select(getAdminId);
  }
}
