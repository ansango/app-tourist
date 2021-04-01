import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [{ path: 'edit/:id', component: ProfileEditComponent }],
  },
];

@NgModule({
  declarations: [ProfileComponent, EducationComponent, ProfileEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProfileModule {}
