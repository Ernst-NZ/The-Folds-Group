import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';
import 'rxjs/add/operator/map';
import { tap, map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private globals: Globals) { }

  login(userName, password) {
    console.log('user get Authentication');
    // return this.http.post(this.globals.dataSource + '/token', data);
    return this.http.post<any>(this.globals.dataSource +
      '/token', 'username=' + userName + '&password=' + password + '&grant_type=password')
      .pipe(tap(JSONObject => {
        // login successful if there's a jwt token in the response
        if (JSONObject) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('JSONToken', JSON.stringify(JSONObject.access_token));
        }

        return JSONObject;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    console.log('Clearing Token And All User Info');
    localStorage.removeItem('JSONToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('companyCode');
    localStorage.removeItem('userCode');
    localStorage.removeItem('userName');
    localStorage.removeItem('companyName');
    this.globals.userRole = '';
    this.globals.userCode = '';
    this.globals.loginUser = false;
    this.globals.userName = '';
  }
}
