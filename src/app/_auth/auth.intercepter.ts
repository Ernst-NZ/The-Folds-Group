import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../_shared/user.service';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private globals: Globals,
              private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') { return next.handle(req.clone()); }

    if (localStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
      });
      return next.handle(clonedreq)
        .pipe(tap(
          succ => { },
          err => {
            if (err.status === 401) {
              console.log('Auth Interceptor 401', err.status, err.statusText, err.message);
              localStorage.removeItem('userToken');
              this.authenticationService.logout();
              location.reload(true);
              this.router.navigateByUrl('/menu');
            }
          }
        ));
    } else {
      // this.router.navigateByUrl('/login');
    }
  }
}
