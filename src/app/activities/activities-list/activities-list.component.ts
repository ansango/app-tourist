import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';
import { loadActivities } from '../state/activities.actions';
import { getActivities } from '../state/activities.selectors';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  activities$!: Observable<Activity[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.activities$ = this.store.select(getActivities);
    this.store.dispatch(loadActivities());
  }
}
