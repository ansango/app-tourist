import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Education } from '../models/education';
import { User } from '../models/user';
import { AppState } from '../store/app.state';
import {
  setErrorMessage,
  setSuccessMessage,
} from '../store/shared/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlUsers = 'api/users';
  private urlEducation = 'api/education';
  messageOK: string = '';
  messageErr: string = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string) {
    this.setMessageErr('');
    this.setMessageOK('');
    return this.http.get<User[]>(this.urlUsers).pipe(
      map((users) => {
        const user = users.filter((user) => {
          return user.email === email && user.password === password;
        });
        if (user.length === 0) {
          this.setMessageErr('Not user found');
          throw new Error('Not user found');
        }
        this.setMessageOK('Login success');
        return user;
      })
    );
  }

  signUp(user: User) {
    return this.http.post<User>(this.urlUsers, user, this.httpOptions);
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData' || '{}');
    if (userDataString) {
      const profile = JSON.parse(userDataString);
      return profile;
    }
    return null;
  }

  logout() {
    this.setMessageErr('');
    this.setMessageOK('');
    localStorage.clear();
  }

  formatUser(data: User): User {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userType: data.userType,
      about: data.about,
      birthday: data.birthday,
      phone: data.phone,
      nationality: data.nationality,
      nif: data.nif,
      companyName: data.companyName,
      companyDescription: data.companyDescription,
      cif: data.cif,
    };
  }

  newFormatUser(data: User): User {
    return {
      id: data.id,
      email: data.email,
      password: data.password,
      userType: data.userType,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.urlUsers}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  getEducation(): Observable<Education[]> {
    const url = `${this.urlEducation}`;
    return this.http.get<Education[]>(url);
  }

  addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(
      this.urlEducation,
      education,
      this.httpOptions
    );
  }

  updateEducation(education: Education): Observable<any> {
    const url = `${this.urlEducation}/${education.id}`;
    return this.http.put<Education>(url, education, this.httpOptions);
  }

  deleteEducation(id?: number): Observable<Education> {
    const url = `${this.urlEducation}/${id}`;
    return this.http.delete<Education>(url, this.httpOptions);
  }

  setMessageErr(message: string) {
    this.messageErr = message;
  }

  getMessageErr() {
    return this.messageErr;
  }

  setMessageOK(message: string) {
    this.messageOK = message;
  }

  getMessageOK() {
    return this.messageOK;
  }

  alertDispatch(status: string) {
    if (status === 'err') {
      const errMessage = this.getMessageErr();
      this.store.dispatch(setErrorMessage({ message: errMessage }));
    }
    if (status === 'ok') {
      const okMessage = this.getMessageOK();
      this.store.dispatch(setSuccessMessage({ message: okMessage }));
      this.autoReset('ok');
    }
    if (status === 'reset') {
      this.store.dispatch(setErrorMessage({ message: '' }));
      this.store.dispatch(setSuccessMessage({ message: '' }));
    }

    if (status === 'resetErr') {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }

    if (status === 'resetOk') {
      this.store.dispatch(setSuccessMessage({ message: '' }));
    }
  }

  autoReset(status: string) {
    setTimeout(() => {
      if (status === 'ok') {
        this.store.dispatch(setSuccessMessage({ message: '' }));
      }
      if (status === 'ko') {
        this.store.dispatch(setErrorMessage({ message: '' }));
      }
    }, 5000);
  }
}
