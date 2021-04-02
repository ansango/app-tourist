import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  profileId: number = 1;
  education!: Education[];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getEducation();
  }

  getEducation(): void {
    this.authService.getEducation().subscribe((education) => {
      this.education = education.filter((e: Education) => {
        return e.userId === this.profileId;
      });
    });
  }
}
