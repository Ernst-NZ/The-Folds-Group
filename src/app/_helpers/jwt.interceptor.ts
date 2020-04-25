import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let JSONToken = localStorage.getItem('userToken');
    if (JSONToken != null) {
      JSONToken = JSONToken.slice(1, -1);
      if (JSONToken && JSONToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${JSONToken}`
          }
        });
      }
    } else {
    }
    return next.handle(request);
  }
}
