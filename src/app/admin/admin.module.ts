import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MYACTIVITY_STATE_NAME } from './state/myactivities.selectors';
import { myActivitiesReducer } from './state/myactivities.reducer';
import { MyActivitiesEffects } from './state/myactivities.effects';

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
    StoreModule.forFeature(MYACTIVITY_STATE_NAME, myActivitiesReducer),
    EffectsModule.forFeature([MyActivitiesEffects]),
  ],
})
export class AdminModule {}
