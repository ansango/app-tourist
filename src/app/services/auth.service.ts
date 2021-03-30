import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User, UserType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlUsers = 'api/users';
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
        return user;
      })
    );
  }

  signUp(email: string, password: string, userType: UserType) {
    return this.http.post<User>(
      this.urlUsers,
      { email, password, userType },
      this.httpOptions
    );
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const user = JSON.parse(userDataString);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
  }

  formatUser(data: any) {
    if (data && data.length > 0) {
      return data[0];
    } else {
      null;
    }
  }

  newFormatUser(data: any): User {
    return {
      email: data.email,
      password: data.password,
      userType: data.userType,
    };
  }

  setErrorMessage(message: string) {
    this.message = message;
  }

  getErrorMessage() {
    return this.message;
  }
}
