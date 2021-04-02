import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { AddEducationComponent } from './add-education/add-education.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'edit/:id', component: EditProfileComponent },
      { path: 'add-edu', component: AddEducationComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    EducationComponent,
    EditProfileComponent,
    EditEducationComponent,
    AddEducationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ProfileModule {}
