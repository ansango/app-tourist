import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyActivity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';
import { loadMyActivities } from '../state/myactivities.actions';
import { getMyActivities } from '../state/myactivities.selectors';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  myActivities$!: Observable<MyActivity[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.myActivities$ = this.store.select(getMyActivities);
    this.store.dispatch(loadMyActivities());
  }
}
