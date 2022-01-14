import { Component, OnInit } from '@angular/core';
import { ShopifyService } from '../_shared/shopify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateCustomParserFormatter } from 'src/app/_shared/dateformat';
import {
  NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { ICostReport, CostReport } from '../_shared/interfaces';
import { SorterService } from '../_shared/sorter.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class ReportComponent implements OnInit {
  private service: ShopifyService;
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;
  date: { year: number; month: number };
  report: Array<ICostReport> = [];
  outstanding: Array<any> = [];
  filteredOut: any;
  newReport: ICostReport = new CostReport();
  oldReport: any;
  filteredText: any;
  errors: any;
  hideDetails = true;
  selectedFromDate: any;
  lastMonth: any;
  selectedToDate: any;
  oldFrom: any;
  oldTo: any;
  pendingDate = false;
  showBrooklyn = false;
  showGoodLad = false;
  showWest = false;
  showHoward = false;
  showRefund = false;
  dateDD: any[] = [];
  filterDate: any[] = [];
  displayFrom: string;
  displayTo: string;

  constructor(
    service: ShopifyService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private sorterService: SorterService,
  ) {
    this.service = service;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.dateFrom = this.calendar.getToday();
    const lastDay = function(y , m) {
    //  console.log(y, m);
      return  new Date(y, m, 0).getDate();
      };
    let endOfMonth = 1;
    endOfMonth = lastDay(+this.dateFrom.year, +this.dateFrom.month);
    this.dateTo = { year: +this.dateFrom.year, month: +this.dateFrom.month , day: +endOfMonth };
    this.dateFrom.day = 1;
    this.getDateData();
    this.buildDropDown();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


  async getDateData() {
  //  console.log('pre data', this.dateFrom, this.dateTo);
    this.spinner.show();
    await this.delay(1000);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];      

    this.filterDate = [];
    this.report = [];
    this.outstanding = [];
    console.log("###################", this.dateFrom.month)
    let tempFrom = monthNames[this.dateFrom.month];; // this.dateFrom.month.toString();
    tempFrom = this.dateFrom.day.toString() + " " +  tempFrom + " '" + this.dateFrom.year.toString().substring(2);
    let tempTo = monthNames[+this.dateTo.month-1];;
    tempTo = this.dateTo.day.toString() + " " +  tempTo + " '" + this.dateTo.year.toString().substring(2);
    this.filterDate.push({
      fromDate: tempFrom,
      toDate: tempTo,
    });
    this.displayFrom = tempFrom;
    this.displayTo = tempTo;
    console.log(this.displayFrom, this.displayTo)
    this.service.SPGetCostReport(this.filterDate)
    .subscribe((cat: ICostReport[]) => {
      (this.report = cat);
      for (const order of this.report) {
        let endInt = 0;
        if (order.OrderDate !== 'Total') {
          endInt = order.OrderDate.indexOf(' ');
          order.OrderDate = order.OrderDate.substring(0, endInt);
        }
      }
      this.filteredText = this.report;
      this.preFilter();
      this.spinner.hide();
    },
      (err) => {
        console.log(err);
        this.spinner.hide();
      });

      // Get Outstanding data
    this.service.SPGetCostOutstanding(this.filterDate)
    .subscribe((cat: any) => {
      (this.outstanding = cat);
      for (const order of this.outstanding) {
        let endInt = 0;
        if (order.OrderDate !== 'Total') {
          endInt = order.OrderDate.indexOf(' ');
          order.OrderDate = order.OrderDate.substring(0, endInt);
        }
      }
      this.filteredOut = this.outstanding;
      this.preFilter();
      this.spinner.hide();
    },
      (err) => {
        console.log(err);
        this.spinner.hide();
      });

  }

  onMonthSelect(args) {
    this.spinner.show();
    this.filterDate = [];
    const lastDay = function(y , m) {
      console.log("###### Last Day m", m)
      return  new Date(y, m , 0).getDate();
      };
    let i = null;
    i = args.target.value;
    let endOfMonth = 1;
    this.dateFrom = this.dateDD[i].value;
    endOfMonth = lastDay(+this.dateFrom.year, +this.dateFrom.month + 1);
    this.dateTo = { year: +this.dateFrom.year, month: +this.dateFrom.month +1 , day: +endOfMonth };

    console.log("################",this.dateTo, endOfMonth)


    this.getDateData();
  }

  sort(prop: string) {
    // A sorter service will handle the sorting
    this.sorterService.sort(this.filteredText, prop);
  }

  setBrooklyn() {
    this.showGoodLad = false;
    this.showHoward = false;
    this.showWest = false;
    this.preFilter();
  }
  setHoward() {
    this.showGoodLad = false;
    this.showBrooklyn = false;
    this.showWest = false;
    this.preFilter();

  }
  setGoodLad() {
    this.showBrooklyn = false;
    this.showHoward = false;
    this.showWest = false;
    this.preFilter();
  }
  setWest() {
    this.showGoodLad = false;
    this.showHoward = false;
    this.showBrooklyn = false;
    this.preFilter();
  }
  setRefund() {
    this.preFilter();
  }

  formatDates(date: Date, index: number) {
    const tempYear = new Date(date).getFullYear().toString();
    const tempMonth = new Date(date).getMonth().toString();
    const tempDay = new Date(date).getDate().toString();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];                     
    const tempMonthName = monthNames[date.getMonth() ];
    console.log(date.getMonth(),tempMonthName)
    this.dateDD.push({
      value: { year: +tempYear, month: +tempMonth, day: +tempDay },
      display: tempMonthName.concat(' - ' , tempYear),
      id: index,
    });
  }

  buildDropDown() {
    let zeroDate = new Date('04-01-2020').getTime();
    let tempDate = new Date('04-01-2020');
    const nowDate = new Date().getTime();
    let i = 0;
    while (zeroDate < nowDate) {
      
      if (tempDate.getMonth() < 11) {
        tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1));
      } else {
        tempDate = new Date(tempDate.setFullYear(tempDate.getFullYear() + 1));
        tempDate = new Date(tempDate.setMonth(0));
      }
      console.log(tempDate, tempDate.getMonth())
      this.formatDates(tempDate, i);
      zeroDate = new Date(tempDate).getTime();
      
      i++;
    }
  }


  preFilter() {
//    console.log('pre filter', this.dateFrom, this.dateTo);
    if (this.dateFrom) {
      let f_date: any;
      const f_string = this.dateFrom.month.toString();
      f_date = f_string.concat(
        '-',
        this.dateFrom.day.toString(),
        '-',
        this.dateFrom.year.toString()
      );
      this.selectedFromDate = new Date(f_date).getTime();
    } else {
      this.selectedFromDate = '';
    }
    if (this.dateTo) {
      let t_date: any;
      const t_string = this.dateTo.month.toString();
      t_date = t_string.concat(
        '-',
        this.dateTo.day.toString(),
        '-',
        this.dateTo.year.toString()
      );
      this.selectedToDate = new Date(t_date).getTime();
    } else {
      this.selectedToDate = '';
    }
    if (
      this.showBrooklyn ||
      this.showGoodLad ||
      this.showHoward ||
      this.showHoward ||
      this.showRefund ||
      this.hideDetails ||
      this.selectedToDate ||
      this.selectedFromDate
    ) {
      this.filterPromise();
    } else {
      console.log('NO Filter');
      this.filteredText = this.report;
      this.filteredOut = this.outstanding;
    }

  }
  formatDate(temp: string) {
    const tmp = temp.split('/');
    const date = tmp[0] + '/' + tmp[1] + '/' + tmp[2];
    return new Date(date).getTime();
  }

  async filterPromise(): Promise<void> {
    this.filteredText = this.report;
    this.filteredOut = this.outstanding;

    if (this.selectedFromDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return +this.formatDate(fullText.OrderDate) >= +this.selectedFromDate ||
          fullText.OrderDate === 'Total';
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return +this.formatDate(fullText.OrderDate) >= +this.selectedFromDate ||
          fullText.OrderDate === 'Total';
      });
    }

    if (this.selectedToDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return +this.formatDate(fullText.OrderDate) <= +this.selectedToDate ||
          fullText.OrderDate === 'Total';
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return +this.formatDate(fullText.OrderDate) <= +this.selectedToDate ||
          fullText.OrderDate === 'Total';
      });
    }

    if (this.showGoodLad) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'GoodLad'
        );
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'GoodLad'
        );
      });
    }

    if (this.showHoward) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'Howard'
        );
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'Howard'
        );
      });
    }

    if (this.showWest) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'West'
        );
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'West'
        );
      });
    }

    if (this.showBrooklyn) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'Brooklyn'
        );
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'Brooklyn'
        );
      });
    }

    if (this.showRefund) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'REFUND'
        );
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'REFUND'
        );
      });
    }

    if (this.hideDetails) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return fullText.OrderDate === 'Total';
      });
      this.filteredOut = this.filteredOut.filter((fullText: any) => {
        return fullText.OrderDate === 'Total';
      });
    }
    console.log(this.filteredOut);
  }

  resetFilters() {
    this.dateFrom = this.calendar.getToday();
    this.dateFrom.day = 1;
    this.dateTo = this.calendar.getToday();
    this.hideDetails = true;
    this.showBrooklyn = false;
    this.showGoodLad = false;
    this.showWest = false;
    this.showHoward = false;
    this.showRefund = false;
    this.preFilter();
  }
}
