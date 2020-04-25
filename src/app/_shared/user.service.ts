import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { IWebUser } from './interfaces';
import { SatsService } from './sats.service';
import { User } from './user.model';
import { Globals } from '../globals';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../_auth/authentication.service';

@Injectable()
export class UserService {
  userClaims: any;
  readonly rootURL = this.globals.dataSource;
  public service: SatsService;
  users: Array<IWebUser> = [];
  user: any;
  errors: any;

  constructor(
    private http: HttpClient, private router: Router,
    private globals: Globals,
    service: SatsService,
 //   private authenticationService: AuthenticationService
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
    return this.http.post(this.rootURL + '/token', data, {
      headers: reqHeader
    });
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



  setUser() {
    if (localStorage.getItem('userToken')) {
      if (typeof this.globals.companyCode === 'undefined' || this.globals.companyCode === null ||
        typeof this.globals.companyName === 'undefined' || this.globals.companyName === null ||
        typeof this.globals.userCode === 'undefined' || this.globals.userCode === null ||
        typeof this.globals.userName === 'undefined' || this.globals.userName === null ||
        !this.globals.userCode || !this.globals.loginUser) {
        this.service.getUserDetailsFull(localStorage.getItem('userCode')).subscribe(
          (users: any[]) => {
            if (users) {
              this.globals.userCode = localStorage.getItem('userCode');
              this.globals.loginUser = true;
              this.user = users[0];
              localStorage.setItem('userRole', this.user.RoleCode);
              localStorage.setItem('companyCode', this.user.CompanyCode);
              localStorage.setItem('companyName', this.user.CompanyName);
              localStorage.setItem('userName', this.user.FirstName);
              this.globals.userRole = this.user.RoleCode;
              this.globals.companyCode = this.user.CompanyCode;
              this.globals.companyName = this.user.CompanyName;
              this.globals.userName = this.user.FirstName;
            }
          },
          error => {
            this.errors = error;
            console.log(this.errors);
          }
        );
        this.service.SPGetUserAccessUser(localStorage.getItem('userCode')).subscribe(
          (users: any[]) => {
            if (users) {
              this.user = users[0];
              console.log(this.user);
              let licence = 'Users: ';
              licence = licence.concat(this.user.Used, '/', this.user.LastUsers);
              let issued: number;
              let used: number;
              let available: number;
              issued = +this.user.LastUsers;
              used = +this.user.Used;
              available = issued - used;
              localStorage.setItem('users', licence);
              localStorage.setItem('available', available.toString());
              localStorage.setItem('lastDate', this.user.LastDate);
              this.globals.users = licence;
            }
          },
          error => {
            this.errors = error;
            console.log(this.errors);
          }
        );
      }


    } else {
      localStorage.removeItem('userToken');
  //    this.authenticationService.logout();
      this.router.navigate(['/menu']);
    }
  }

  registerNewUser(user: any) {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True',
    'Access-Control-Allow-Origin': '*' });
    return this.http.post(this.rootURL + '/api/account/register', user);
  }

}
