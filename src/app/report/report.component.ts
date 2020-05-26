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
  newReport: ICostReport = new CostReport();
  oldReport: any;
  filteredText: any;
  errors: any;
  hideDetails: boolean;
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
    this.service.SPGetCostReport()
      .subscribe((cat: ICostReport[]) => {
        (this.report = cat);
        console.log(this.report);
        for (const order of this.report) {
          let endInt = 0;
          if (order.OrderDate !== 'Total' ) {
            endInt = order.OrderDate.indexOf(' ');
            order.OrderDate = order.OrderDate.substring(0, endInt);
          }
        }
        this.filteredText = this.report;
        console.log(this.report);
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
    const tempYear = new Date().getFullYear();
    const tempMonth = new Date().getMonth();
    const tempDay = new Date().getDate();
    this.lastMonth = { year: +tempYear, month: +tempMonth, day: +tempDay };
    this.dateFrom = this.lastMonth;
    this.dateTo = this.calendar.getToday();
  }


  sort(prop: string) {
    // A sorter service will handle the sorting
    this.sorterService.sort(this.filteredText, prop);
  }

  refreshData() {
    this.spinner.show();
    this.service.SPGetCostReport()
      .subscribe((cat: ICostReport[]) => {
        (this.report = cat);
        this.filteredText = this.report;
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }

  getFold(CheckId) {
    this.spinner.show();
    this.service.getFolds(CheckId).subscribe(
      (check: any[]) => {
        if (check) {
          this.oldReport = check;
          this.spinner.hide();
        }
      },
      error => {
        this.errors = error;
        console.log(this.errors);
      }
    );
  }

  clearOldReport() {
    this.oldReport = new CostReport();
  }

  updateFold() {
    this.spinner.show();
    this.service.putFolds(this.oldReport).subscribe(
      () => {
        this.refreshData();
      },
      error => {
        this.errors = error;
        alert(this.errors);
      }
    );
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



  // onDetailClick() {

  //   this.preFilter();
  // }

  preDate() {
    this.oldFrom = this.dateFrom;
    this.oldTo = this.dateTo;
    this.pendingDate = true;
  }

  preFilter() {
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
      this.hideDetails ||
      this.selectedToDate ||
      this.selectedFromDate
    ) {
      this.filterPromise();
    } else {
      console.log('NO Filter');
      this.filteredText = this.report;
    }

  }
  formatDate(temp: string) {
    const tmp = temp.split('/');
    const date = tmp[1] + '/' + tmp[0] + '/' + tmp[2];
    return new Date(date).getTime();
  }

  async filterPromise(): Promise<void> {
    this.filteredText = this.report;

    if (this.selectedFromDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return +this.formatDate(fullText.OrderDate) >= +this.selectedFromDate ||
        fullText.OrderDate === 'Total';
      });
    }

    if (this.selectedToDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
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
    }

    if (this.showHoward) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
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
    }

    if (this.showBrooklyn) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return (
          fullText.FoldStore === 'Brooklyn'
        );
      });
    }
    if (this.hideDetails) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return fullText.OrderDate === 'Total';
      });
    }
  }

  resetFilters() {
    this.dateFrom = this.lastMonth;
    this.dateTo = this.calendar.getToday();
    this.hideDetails = false;
    this.showBrooklyn = false;
    this.showGoodLad = false;
    this.showWest = false;
    this.showHoward = false;
    this.preFilter();
  }


}
