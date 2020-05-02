import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_auth/authentication.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private globals: Globals, ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const error = err.error.message || err.statusText;
        if (err.status === 401) {
          console.log('F');
          console.log('Error Interceptor 401', error, err.status, err.statusText, err.message);
          this.authenticationService.logout();
          location.reload(true);
          this.router.navigateByUrl('/menu');
          console.log('G');
          // redirect to the login route
          // or show a modal
        }
        console.log('h');
        console.log('HTTP Error Other: ', error, err.status, err.statusText, err.message);
      }
    });
  }
}
