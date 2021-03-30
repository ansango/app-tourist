import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ACTIVITY_STATE_NAME } from '../activities/state/activities.selectors';
import { activitiesReducer } from '../activities/state/activities.reducer';
import { ActivitiesEffects } from '../activities/state/activities.effects';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesListComponent,
    children: [],
  },
];

@NgModule({
  declarations: [ActivitiesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(ACTIVITY_STATE_NAME, activitiesReducer),
    EffectsModule.forFeature([ActivitiesEffects]),
  ],
})
export class AdminModule {}
