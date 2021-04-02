import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import {
  getUserType,
  isAuthenticated,
} from 'src/app/auth/state/auth.selectors';
import { addFavorite } from 'src/app/favorites/state/favorites.actions';
import { getFavoriteById } from 'src/app/favorites/state/favorites.selectors';
import { Activity } from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';
import { getActivityById } from '../state/activities.selectors';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>;
  userType$?: Observable<any>;
  activity!: Activity;
  favorite!: Activity;
  isFavorite$!: Observable<boolean>;
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
      this.isFavorite$ = this.store.select(getFavoriteById, { id });
    });

    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.userType$ = this.store.select(getUserType);
  }

  onSubscription() {}

  onFavorites() {
    this.isFavorite$ = of(true);
    const activity = this.activity;
    this.store.dispatch(addFavorite({ activity }));
  }

  ngOnDestroy(): void {
    if (this.activitySubscription$) {
      this.activitySubscription$.unsubscribe();
    }
  }
}
