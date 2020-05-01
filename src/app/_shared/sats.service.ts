import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Globals } from '../globals';
import { IWebUser } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatsService {
  reqHeader: any;
  editHeader: any;

  readonly rootURL = this.globals.dataSource + '/api';
  constructor(private http: HttpClient, private globals: Globals) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded',
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });
    this.editHeader = new HttpHeaders({ 'No-Auth': 'True' });
  }
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

  sendEmail(formData: {}) {
    return this.http.post(this.rootURL + '/values/', formData);
  }

  get_Test() {
    console.log('Start fo test ################################');

    const params = new HttpParams().set('companyCode', 'DEMO').set('id', 'SOP');
    this.http
      .get(this.rootURL + '/SPGetSOP/' + 'DEMO')
      .subscribe((resSP: any[]) => {
        console.log('5');
        console.log(resSP, 'info in service');
        return resSP;
      });
  }


  // get User List

  postUser(userForm: any) {
    return this.http.post(this.rootURL + '/webUsers/', userForm);
  }

  registerNewUser(user: any) {
    return this.http.post(this.rootURL + '/api/account/register', user);
  }

  getSPUsers(): Observable<IWebUser[]> {
    return this.http.get<IWebUser[]>(this.rootURL + '/Users/SPGetUsers');
  }

  getASPUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.rootURL + '/Users/SPGetUsers');
  }

  getUser(Username: string): Observable<IWebUser[]> {
    return this.http
      .get<IWebUser[]>(this.rootURL + '/webUsers/' + Username)
      .pipe(catchError(this.handleError));
  }

  putUser(userForm: any) {
    return this.http.post(
      this.rootURL + '/webUsers/' + userForm.Username,
      userForm
    );
  }


  SPGetUserAccessUser(userCode: string) {
    return this.http.get(this.rootURL + '/SPGetUserAccessUser/' + userCode);
  }

  SPGetUserAccessAll() {
    return this.http.get(this.rootURL + '/SPGetUserAccessAll/');
  }
  // get Companies List

}
