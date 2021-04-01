import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteActivity,
  loadActivitiesAdmin,
} from 'src/app/activities/state/activities.actions';
import { getActByAdmin } from 'src/app/activities/state/activities.selectors';
import { getProfileId } from 'src/app/auth/state/auth.selectors';

import { Activity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  profileId?: number = 0;
  activities$!: Observable<Activity[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.activities$ = this.store.select(getActByAdmin);
    this.store.select(getProfileId).subscribe((id) => (this.profileId = id));
    this.store.dispatch(loadActivitiesAdmin({ idUser: this.profileId }));
  }

  onDelete(id?: number) {
    if (confirm('Are you sure you want to delete?') && id !== undefined) {
      this.store.dispatch(deleteActivity({ id }));
    }
  }
}
