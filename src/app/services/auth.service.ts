import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlUsers = 'api/users';
  message: string = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<User[]>(this.urlUsers).pipe(
      map((users) => {
        const user = users.filter((user) => {
          return user.email === email && user.password === password;
        });
        if (user.length === 0) {
          this.setErrorMessage('Not user found');
          throw new Error('Not user found');
        }
        console.log(user);

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
    localStorage.removeItem('userData');
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

  setErrorMessage(message: string) {
    this.message = message;
  }

  getErrorMessage() {
    return this.message;
  }
}
