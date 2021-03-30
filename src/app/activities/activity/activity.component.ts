import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';
import { getActivityById } from '../state/activities.selectors';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  activity!: Activity;
  activitySubscription$!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      this.activitySubscription$ = this.store
        .select(getActivityById, { id })
        .subscribe((data) => {
          this.activity = data;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.activitySubscription$) {
      this.activitySubscription$.unsubscribe();
    }
  }
}
