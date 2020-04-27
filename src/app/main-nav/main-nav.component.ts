import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Globals } from '../globals';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public globals: Globals) {}


    ngOnInit() {
       console.log('get User');

       if (typeof this.globals.userName !== 'undefined' && this.globals.userName !== null) {
        console.log('Globals', this.globals.userName);
      } else if (typeof localStorage.getItem('userName') !== 'undefined' && localStorage.getItem('userName') !== null) {
        console.log('storage', localStorage.getItem('userName'));
      } else {
        console.log('Rest');
      }
    }

    Logout() {
      // localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userToken');
      localStorage.removeItem('companyCode');
      localStorage.removeItem('companyName');
      this.globals.userName = '';
      this.globals.userRole = '';
      this.globals.userCode = '';
      this.globals.companyCode = '';
      this.globals.companyName = '';
      this.globals.loginUser = false;
    }
}

