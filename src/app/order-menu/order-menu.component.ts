import { Component, OnInit } from '@angular/core';
import { IShopOrders, ShopOrders } from '../_shared/interfaces';
import { ShopifyService } from '../_shared/shopify.service';
import { Globals } from '../globals';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/_shared/dateformat';
import { SorterService } from '../_shared/sorter.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class OrderMenuComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  private service: ShopifyService;
  orderList: Array<IShopOrders> = [];
  tempOrder: ShopOrders = new ShopOrders();
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;
  date: { year: number; month: number };
  selectedFromDate: any;
  selectedToDate: any;
  lastMonth: any;
  pendingDate = false;
  oldFrom: any;
  oldTo: any;
  outstanding = false;
  closeResult: string;
  filteredText: any;
  tempText: any[] = [];
  searchText = '';
  tempDate: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    service: ShopifyService,
    public globals: Globals,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private sorterService: SorterService,
  ) {
    this.service = service;
  }

  ngOnInit(): void {
    this.service.SPGetOrders()
      .subscribe((cat: IShopOrders[]) => {
        (this.orderList = cat);
        this.filteredText = this.orderList;
        console.log(this.orderList);
      },
        (err) => {
          console.log(err);
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
    this.sorterService.sort(this.orderList, prop);
  }

  keyup(event) {
    console.log('event', event);
    console.log('text', this.searchText);
    this.searchText = event;

}


  filter(event) {
    if (event) {
      console.log('search');
      const data = event;
      this.filteredText = this.orderList.filter((fullText: IShopOrders) => {
        return (
          fullText.OrderNumber.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderDate.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderCustomer.toLowerCase().indexOf(data.toLowerCase()) >
            -1 ||
          fullText.OrderPayment.toLowerCase().indexOf(data.toLowerCase()) >
            -1 ||
          fullText.FoldStatus.toLowerCase().indexOf(data.toLowerCase()) >
            -1 ||
          fullText.FoldStore.toLowerCase().indexOf(data.toLowerCase()) > -1
          ||
          fullText.OrderTotal.toString().toLowerCase().indexOf(data.toLowerCase()) > -1
        );
      });
    } else {
      this.filteredText = this.orderList;
      //     this.LineText = this.fullText;
    }
  }

  preDate() {
    this.oldFrom = this.dateFrom;
    this.oldTo = this.dateTo;
    this.pendingDate = true;
    console.log(this.oldFrom);
  }

  resetFilters() {
    this.dateFrom = this.lastMonth;
    this.dateTo = this.calendar.getToday();
    this.outstanding = false;
    this.preFilter();
  }

  preFilter() {
    console.log('start pre filter');
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
      this.outstanding ||
      this.selectedToDate ||
      this.selectedToDate
    ) {
      this.filterPromise();
    } else {
      console.log('NO Filter');
      this.filteredText = this.orderList;
    }
  }

  formatDate(temp: string) {
    const tmp = temp.split('/');
    const date = tmp[1] + '/' + tmp[0] + '/' + tmp[2];
    return new Date(date).getTime();
  }

  async filterPromise(): Promise<void> {
    console.log('start filter');
    this.filteredText = this.orderList;
    console.log(this.filteredText);

    if (this.selectedFromDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
      return +this.formatDate(fullText.OrderDate) >= +this.selectedFromDate;
    });
    }

    if (this.selectedToDate) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
      return +this.formatDate(fullText.OrderDate) <= +this.selectedToDate;
    });
    }

    if (this.outstanding) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return fullText.FoldStatus !== 'Fulfilled';
      });
    }
  }


  getOrder(orderid: string) {
    let orderAddress = 'https://thefoldgroup.myshopify.com/admin/orders/';
    orderAddress = orderAddress.concat(orderid);
    window.open(orderAddress, '_blank');
  }

  openLog(content, i: any, ) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    window.location.href = 'https://thefoldgroup.myshopify.com/admin/orders/2087487799330';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
