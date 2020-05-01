import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_shared/user.service';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, public globals: Globals, ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('userToken')) {
      // logged in so return true
      // this.globals.userName = localStorage.getItem('userToken');
      this.globals.userName = localStorage.getItem('userName');
      console.log('Can Activate');
      if (localStorage.getItem('userName')) {
      } return true;
    }

    // not logged in so redirect to login page with the return url
    console.log('Unable to Activate');
    //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return true;
  }
}
