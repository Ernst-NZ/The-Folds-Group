import { Globals } from 'src/app/globals';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  currentUrl: string;
  userClaims: any;
  userName: string;
  testButton = false;
  hasList = false;
  companyName: string;
  SOPText: any;
  CheckText: any;
  companyClass: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public globals: Globals
  ) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {
    if (window.location.origin.indexOf('test') > 0) {
      this.testButton = true;
    }
    this.companyClass = '';
    if (this.globals.companyCode) {
      this.companyClass = this.globals.companyCode;
    } else if (localStorage.getItem('companyCode')) {
      this.companyClass = localStorage.getItem('companyCode');
    }

    if (this.globals.companyName) {
      this.companyName = this.globals.companyName;
    } else if (localStorage.getItem('companyName')) {
      this.companyName = localStorage.getItem('companyName');
    } else {
      this.companyName = this.globals.companyCode;
    }
     console.log('get User');

    if (typeof this.globals.userName !== 'undefined' && this.globals.userName !== null) {
      this.userName = this.globals.userName;
      console.log('Globals', this.globals.userName)
    } else if (typeof localStorage.getItem('userName') !== 'undefined' && localStorage.getItem('userName') !== null) {
      this.userName = localStorage.getItem('userName');
      console.log('storage', localStorage.getItem('userName'));
    } else {
      console.log('Rest');
      this.userName = this.globals.userCode;
    }

    this.getDimensions();
  }

  ngAfterContentChecked() {
    if (this.globals.companyCode && !this.hasList) {
      this.companyClass = this.globals.companyCode;
        this.fillData();
    }
  }
  fillData() {
    this.hasList = true;
    this.hasList = true;
  }

  Logout() {
    // localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    localStorage.removeItem('companyCode');
    localStorage.removeItem('companyName');
    this.userClaims = '';
    this.companyClass = '';
    this.router.navigate(['/menu']);
    this.globals.userName = '';
    this.globals.userRole = '';
    this.globals.userCode = '';
    this.globals.companyCode = '';
    this.globals.companyName = '';
    this.globals.loginUser = false;
  }
  Testing() {
    this.globals.isTesting = !this.globals.isTesting;
  }

  private getDimensions() {
    if (innerWidth >= 500) {
      this.globals.cWidth = 480;
    } else {
      this.globals.cWidth = innerWidth - 200;
    }
  }

  focusOutFunction() { }
}
