import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SatsService } from './sats.service';
import { User } from './user.model';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_auth/authentication.service';

@Injectable()
export class UserService {
  userClaims: any;
  readonly rootURL = this.globals.dataSource;
  public service: SatsService;
  user: any;
  errors: any;

  constructor(
    private http: HttpClient, private router: Router,
    private globals: Globals,
    service: SatsService,
    private authenticationService: AuthenticationService
  ) {
    this.service = service;
  }

  registerUser(user: User) {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootURL + '/api/User/Register', user, {
      headers: reqHeader
    });
  }

  userAuthentication(userName, password) {
    console.log('user Do Authentication');
    const data =
      'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded',
      'No-Auth': 'True'
    });
    console.log(data, reqHeader)
    return this.http.post(this.rootURL + '/token', data, {
      headers: reqHeader
    });
  }

  SPGetUserInfo(username: string): Observable<any[]> {
    return this.http.get<any[]>(this.rootURL + '/api/SPGetUserInfo/' + username);
  }

  forgotPassword(email) {
    console.log('Forget Password');
    const reqHeader = new HttpHeaders({
      'No-Auth': 'True'
    });
    return this.http.post(this.rootURL + '/api/Account/ForgotPassword', email, {
      headers: reqHeader
    });
  }


  resetPassword(emailData) {
    console.log('Reset Password', emailData);
    const reqHeader = new HttpHeaders({
      'No-Auth': 'True'
    });
    return this.http.post(this.rootURL + '/api/Account/ResetPassword', emailData, {
      headers: reqHeader
    });
  }

  changePassword(resetData) {
    console.log('Change Password', resetData);
    const reqHeader = new HttpHeaders({
      'No-Auth': 'True'
    });
    return this.http.post(this.rootURL + '/api/Account/ChangePassword', resetData, {
      headers: reqHeader
    });
  }


  registerNewUser(user: any) {
    console.log('user', user);
    const reqHeader = new HttpHeaders({
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(this.rootURL + '/api/account/register', user);
  }


  setUser() {
    if (localStorage.getItem('userToken')) {
      if (
        typeof this.globals.userCode === 'undefined' || this.globals.userCode === null ||
        typeof this.globals.userName === 'undefined' || this.globals.userName === null ||
        !this.globals.userCode || !this.globals.loginUser) {
        this.SPGetUserInfo(localStorage.getItem('userCode')).subscribe(
          (users: any[]) => {
            if (users) {
              this.globals.userCode = localStorage.getItem('userCode');
              this.globals.loginUser = true;
              this.user = users[0];
              localStorage.setItem('userName', this.user.FirstName);
              localStorage.setItem('firstName', this.user.FirstName);
              this.globals.userName = this.user.FirstName;
              this.globals.FirstName = this.user.FirstName;
            }
          },
          error => {
            this.errors = error;
            console.log(this.errors);
          }
        );
      } else {
        localStorage.removeItem('userToken');
        this.authenticationService.logout();
        this.router.navigate(['/menu']);
      }
    }
  }
}
