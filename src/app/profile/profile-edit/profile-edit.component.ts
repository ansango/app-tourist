import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getProfile, getProfileType } from 'src/app/auth/state/auth.selectors';
import { Profile, UserNationality } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profile!: Profile;
  profileType$!: Observable<any>;
  profileForm!: FormGroup;
  profileSubscription$!: Subscription;
  nationalities = Object.values(UserNationality);
  selectedNatES?: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      this.profileSubscription$ = this.store
        .select(getProfile)
        .subscribe((data) => {
          this.profile = data;
          this.createForm();
        });
    });
    this.profileType$ = this.store.select(getProfileType);
  }

  createForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(55),
        Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
      ]),
      lastName: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(55),
        Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
      ]),
      birthday: new FormControl(''),
      phone: new FormControl(0),
      nationality: new FormControl(null, [Validators.required]),
      nif: new FormControl(null, [Validators.required]),
      about: new FormControl(null),
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
      ]),
      companyDescription: new FormControl(''),
      cif: new FormControl('', Validators.required),
    });
    this.updateForm();
  }

  updateForm() {
    this.profileForm.patchValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      birthday: this.profile.birthday,
      phone: this.profile.phone,
      nationality: this.profile.nationality,
      nif: this.profile.nif,
      about: this.profile.about,
      companyName: this.profile.companyName,
      companyDescription: this.profile.companyDescription,
      cif: this.profile.cif,
    });
  }

  selectNat(event: any): boolean {
    if (event.target.value === UserNationality)
      return (this.selectedNatES = true);
    return (this.selectedNatES = false);
  }

  checkNIF(group: FormGroup): ValidationErrors | null {
    const ES = group.get('nationality')?.value === 'es';
    const NIF = group.get('nif')?.value;
    const REG = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (ES === true && REG.test(NIF) === false) {
      return { errorNIF: true };
    } else {
      return null;
    }
  }

  onUpdate() {}
}
