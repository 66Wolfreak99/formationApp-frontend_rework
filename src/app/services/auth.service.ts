import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  userName: any;
    constructor(private router: Router,
                private http: HttpClient) {}

  createNewUser(firstName: string, lastName: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signin',
        {firstName: firstName, lastName: lastName, email: email, password: password })
        .subscribe(
          () => {
            this.login(email, password).then(
              () => {
                resolve(null);
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData: {firstName:string, lastName: string, userId: string, token: string, }) => {
            console.log(authData)
            this.token = authData.token;
            this.userId = authData.userId;
            this.userName = {firstName: authData.firstName, lastName: authData.lastName};
            this.isAuth$.next(true);
            resolve(null);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}

