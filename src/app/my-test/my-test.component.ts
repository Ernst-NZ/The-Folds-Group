import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

// import { NgbdDatepickerBasic } from './datepicker-basic';

@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.scss']
})
export class MyTestComponent implements OnInit {
  title = 'angular-bootstrap-datepicker-tutorial';
  marked = false;
  theCheckbox = false;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  outstanding = false;
  dateTo: NgbDateStruct;

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
  }
  selectToday() {
    this.model = this.calendar.getToday();
    console.log(this.model);
  }

  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  setCurrent() {
    //Current Date
    this.dp.navigateTo()
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
  }
test() {
console.log(this.model);

}
  navigateEvent(event) {
    this.date = event.next;
  }

  preFilter() {

  }

  preDate() {
    console.log(this.dateTo);

  }
}
