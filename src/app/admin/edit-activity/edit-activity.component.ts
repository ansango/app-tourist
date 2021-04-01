import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  getActAdminById,
  getActivityById,
} from 'src/app/activities/state/activities.selectors';
import { getUserId } from 'src/app/auth/state/auth.selectors';
import {
  Activity,
  ActivityCategory,
  ActivityLanguage,
  ActivitySubcategoryBeach,
  ActivitySubcategoryCulture,
  ActivitySubcategoryWine,
} from 'src/app/models/activity';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
  userId?: number;
  activity!: Activity;
  activityForm!: FormGroup;
  activitySubscription$!: Subscription;
  selectedCat: string = '';
  categories = Object.values(ActivityCategory);
  subCulture = Object.values(ActivitySubcategoryCulture);
  subWine = Object.values(ActivitySubcategoryWine);
  subBeach = Object.values(ActivitySubcategoryBeach);
  languages = Object.values(ActivityLanguage);
  ActivityCategory = ActivityCategory;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      this.activitySubscription$ = this.store
        .select(getActAdminById, { id })
        .subscribe((data) => {
          this.activity = data;
          this.createForm();
        });
    });

    this.store.select(getUserId).subscribe((id) => (this.userId = id));
  }

  createForm() {
    this.activityForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55),
      ]),
      category: new FormControl(null, [Validators.required]),
      subcategory: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      language: new FormControl(null, [Validators.required]),
      date: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
    this.updateForm();
  }

  updateForm() {
    this.activityForm.patchValue({
      name: this.activity.name,
      category: this.activity.category,
      subcategory: this.activity.subcategory,
      description: this.activity.description,
      language: this.activity.language,
      date: this.activity.date,
      price: this.activity.price,
    });
  }

  onSubmit() {}

  ngOnDestroy(): void {
    if (this.activitySubscription$) {
      this.activitySubscription$.unsubscribe();
    }
  }
}
