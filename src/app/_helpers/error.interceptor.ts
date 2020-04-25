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

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log('ErrorInterceptor - ', request);
  //   console.log('ErrorInterceptor next - ', next);

  //   return next.handle(request).pipe(catchError(err => {
  //     if (err.status === 401) {
  //       // auto logout if 401 response returned from api
  //       this.authenticationService.logout();
  //       location.reload(true);
  //     }
  //     const error = err.error.message || err.statusText;
  //     return throwError(error);
  //   }));
  //   return throwError(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('ErrorInterceptor - ', request);
    console.log('ErrorInterceptor Next- ', next);
    console.log('A');

    return next.handle(request).do((event: HttpEvent<any>) => {
      console.log('B');
      if (event instanceof HttpResponse) {
        console.log('C');
        console.log('Error Event - ', event);        // do stuff with response if you want
      }
    }, (err: any) => {
      console.log('D');
      if (err instanceof HttpErrorResponse) {
        console.log('E');
        console.log('Error - ', err);
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
      console.log('I');
    });
    console.log('J');
  }
}
