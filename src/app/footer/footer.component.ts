import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  currentYear: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public globals: Globals
  ) { }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
  }

  showVersion() {
    alert('Fold Version Beta Test V28');
  }

}
