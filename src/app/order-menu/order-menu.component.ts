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
  tempSplit: any[] = [];
  splitTotal: any[] = [];
  captures: any[] = [];
  newFold: any[] = [];
  searchText = '';
  tempDate: number;
  MultiOrders: any;
  FoldComments: string;
  OrderNo: string;
  OrderId: string;
  Allocated = false;
  OrderItemTotal: number;
  VendMaster: any;
  VendTemp: any;
  VendProducts: any;
  ReadyForPost = false;

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
    this.spinner.show();
    this.service.SPGetOrders()
      .subscribe((cat: IShopOrders[]) => {
        (this.orderList = cat);
        this.filteredText = this.orderList;
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
    this.sorterService.sort(this.orderList, prop);
  }

  keyup(event) {
    console.log('event', event);
    console.log('text', this.searchText);
    this.searchText = event;

  }


  filter(event) {
    if (event) {
      const data = event;
      this.filteredText = this.orderList.filter((fullText: IShopOrders) => {
        return (
          fullText.OrderNumber.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderDate.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderCustomer.toLowerCase().indexOf(data.toLowerCase()) >
          -1 ||
          fullText.FoldStatus.toLowerCase().indexOf(data.toLowerCase()) >
          -1 ||
          fullText.FoldStore.toLowerCase().indexOf(data.toLowerCase()) > -1
          ||
          fullText.OrderTotal.toString().toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.FoldComments.toLowerCase().indexOf(data.toLowerCase()) > -1
        );
      });
    } else {
      this.filteredText = this.orderList;
      //     this.LineText = this.fullText;  FoldComments
    }
  }

  preDate() {
    this.oldFrom = this.dateFrom;
    this.oldTo = this.dateTo;
    this.pendingDate = true;
  }

  resetFilters() {
    this.dateFrom = this.lastMonth;
    this.dateTo = this.calendar.getToday();
    this.outstanding = false;
    this.preFilter();
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

  StoreList(store: string, stock: number, sku: string) {
    this.captures.push({
      Store: store,
      Stock: stock,
      SKU: sku,
    });
    return this.captures;
  }

  getStore() {
    if (this.MultiOrders) {
      for (let n = 0; n < this.MultiOrders.length; n++) {
        const ordered = this.MultiOrders[n].ItemId;
        this.captures = [];
        if (this.MultiOrders[n].Brooklyn >= ordered && this.MultiOrders[n].ItemSKU !== 'Total') {
          const temp = this.StoreList('Brooklyn', this.MultiOrders[n].Brooklyn, this.MultiOrders[n].ItemSKU);
          this.MultiOrders[n].Store = temp;
        }
        if (this.MultiOrders[n].GoodLad >= ordered) {
          const temp = this.StoreList('GoodLad', this.MultiOrders[n].GoodLad, this.MultiOrders[n].ItemSKU);
          this.MultiOrders[n].Store = temp;
        }
        if (this.MultiOrders[n].Howard >= ordered) {
          const temp = this.StoreList('Howard', this.MultiOrders[n].Howard, this.MultiOrders[n].ItemSKU);
          this.MultiOrders[n].Store = temp;
        }
        if (this.MultiOrders[n].West >= ordered) {
          const temp = this.StoreList('West', this.MultiOrders[n].West, this.MultiOrders[n].ItemSKU);
          this.MultiOrders[n].Store = temp;
        }
        if (this.captures.length < 1) {
          const temp = this.StoreList('Available', 0, this.MultiOrders[n].ItemSKU);
          this.MultiOrders[n].Store = temp;
        }
      }
    }
  }

  async filterPromise(): Promise<void> {
    console.log('start filter');
    this.filteredText = this.orderList;
    // console.log(this.filteredText);

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
        return fullText.FoldStatus !== 'VOIDED' && fullText.FoldStatus !== 'CLOSED';
      });
    }
  }

  getOrder(orderid: string) {
    let orderAddress = 'https://thefoldgroup.myshopify.com/admin/orders/';
    orderAddress = orderAddress.concat(orderid);
    window.open(orderAddress, '_blank');
  }

  openComments(comments, i: any, ) {
    this.splitTotal = [];
    this.ReadyForPost = false;
    this.tempSplit = [];
    this.OrderItemTotal = i.OrderItemTotal;
    this.OrderNo = i.OrderNumber;
    this.OrderId = i.OrderId;
    if (i.FoldStatus !== 'Fulfilled' && (i.FoldStore !== 'NO SKU' && i.FoldStore !== 'Multiple Stores')) {
      this.Allocated = true;
    } else {
      this.Allocated = false;
    }
    this.FoldComments = i.FoldComments;
    if (i.FoldStore === 'NO SKU' || i.FoldStore === 'Multiple Stores') {
      this.spinner.show();
      this.service.CTGetMultiOrders_Static(i.OrderNumber)
        .subscribe((cat: any) => {
          (this.MultiOrders = cat);
          this.getStore();
          this.spinner.hide();
        },
          (err) => {
            console.log(err);
            this.spinner.hide();
          });
    }
    this.modalService
      .open(comments, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.MultiOrders = '';
          this.Allocated = false;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.MultiOrders = '';
          this.Allocated = false;
        }
      );
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

  getSplitTotals(store: string, sku: string) {
    if (this.splitTotal.find(s => s.Store === store)) {
      let i = 0;
      let stores = 0;
      for (i = 0, stores = this.splitTotal.length; i < stores; i++) {
        if (this.splitTotal[i].Store === store) {
          this.splitTotal[i].Items = +this.splitTotal[i].Items + 1;
          this.splitTotal[i].SKU = this.splitTotal[i].SKU.concat(', ', sku);
        }
      }
    } else {
      this.splitTotal.push({
        Store: store,
        Items: 1,
        SKU: sku,
      });
    }
  }

  // get the list of registers and SKU numbers
  StoreSplit(store: string, sku: string) {
    const n = store.indexOf('-') + 2;
    store = store.substring(n);
    if (this.tempSplit.find(s => s.SKU === sku)) {
      let i = 0;
      let stores = 0;
      for (i = 0, stores = this.tempSplit.length; i < stores; i++) {
        if (this.tempSplit[i].SKU === sku) {
          this.tempSplit[i].Store = store;
        }
      }
      this.splitTotal = [];
      this.ReadyForPost = false;
      for (i = 0, stores = this.tempSplit.length; i < stores; i++) {
        this.getSplitTotals(this.tempSplit[i].Store, this.tempSplit[i].SKU);
      }
    } else {
      this.tempSplit.push({
        Store: store,
        SKU: sku,
      });
      this.getSplitTotals(store, sku);
    }
  }

  onProdSelect(args) {
    if (args.target.value !== '0') {
      this.StoreSplit(args.target.options[args.target.selectedIndex].text, args.target.value);
    }
  }

  getCurrent() {
    this.spinner.show();
    this.service.CTGetMultiOrders(this.OrderNo)
      .subscribe((cat: any) => {
        (this.MultiOrders = cat);
        this.getStore();
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }

  openVend() {
    this.spinner.show();
    let VendId: string;
    this.service.CTGetVendID(this.OrderNo)
      .subscribe((cat: any) => {
        (VendId = cat);
        console.log(VendId);
        this.spinner.hide();
        let orderAddress = 'https://thefold.vendhq.com/history#';
        orderAddress = orderAddress.concat(VendId);
        window.open(orderAddress, '_blank');
        //    https://thefold.vendhq.com/history#59423c0f-8e53-b7a4-11ea-94a123b534f8
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }


  testSingle(targetStore: string) {
    // Get the current Order
    // Loop through the Total table
    // Total table has the products by Store
    // Grab the firts store
    // Loop through the Order and remove Products that is not linked to the specific store
  //  targetStore = 'Brooklyn';
  this.spinner.show();
  let i = 0;
  let stores = 0;
  this.service.CTGetVendOrder(this.OrderNo)
      .subscribe((cat: any) => {
        console.log(cat);
      //  return;
        this.VendMaster = cat;
        this.VendProducts = this.VendMaster.register_sale_products;
        let currentRegister: string;
        let currentProds = [];
        for (let n = 0; n < this.splitTotal.length; n++) {
          this.VendTemp = this.VendMaster;
          currentRegister = this.splitTotal[n].Store;
          currentProds = this.splitTotal[n].SKU;
          if (this.splitTotal[n].Store === targetStore) {
            this.splitOrder(currentRegister, currentProds);
            for (i = 0, stores = this.splitTotal.length; i < stores; i++) {
              if (this.splitTotal[i].Store === targetStore) {
                this.splitTotal[i].Processed = 'Checked';
                this.splitTotal[i].NewOrder = this.VendTemp;
              }
            }
          }
        }
        this.checkForPost();
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }

  splitOrder(register: string, prods: any) {
    this.spinner.show();
    prods = prods.concat(', ', 'FreeStandardShippingPromo');
    const products = this.VendTemp.register_sale_products;
    let orderCost = 0;
    let orderPrice = 0;
    let orderTax = 0;
    for (let n = 0; n < products.length; n++) {
      const substrings = prods.split(', ');
      const str = products[n].sku;
      if (new RegExp(substrings.join('|')).test(str)) {
        orderCost = orderCost + products[n].cost;
        orderPrice = orderPrice + products[n].price_total;
        orderTax = orderTax + products[n].tax_total;
        //  console.log('Match using \'' + str + '\'');
      } else {
     //   console.log('No match using \'' + str + '\'' + n);
        this.VendTemp.register_sale_products.splice(n, 1, {
        });
        // console.log(n, this.VendTemp);
      }
    }
    switch (register) {
      case 'Brooklyn': {
        this.VendTemp.register_id = this.globals.BrookLyn;
        break;
      }
      case 'GoodLad': {
        this.VendTemp.register_id = this.globals.GoodLad;
        break;
      }
      case 'Howard': {
        this.VendTemp.register_id = this.globals.Howard;
        break;
      }
      case 'West': {
        this.VendTemp.register_id = this.globals.West;
        break;
      }
      default: {
        this.VendTemp.register_id = this.globals.BrookLyn;
        break;
      }
   }
    this.VendTemp.user_id = '06c2f1bf-e94b-11ea-efcf-004371e2252e';
    this.VendTemp.user_name = 'Jacob Visser';
    this.VendTemp.register_sale_payments[0].amount = 999;
    this.VendTemp.total_cost = orderCost;
    this.VendTemp.total_price = 999;
    this.VendTemp.total_tax = orderTax;
    this.VendTemp.totals.total_payment = 999;
    this.VendTemp.totals.total_price = 999;
    this.VendTemp.totals.total_tax = orderTax;

    this.spinner.hide();
    // return products;
  }

  checkForPost() {
    for (let n = 0; n < this.splitTotal.length; n++) {
      this.ReadyForPost = true;
      if (!this.splitTotal[n].Processed) {
        this.ReadyForPost = false;
      }
    }
  }

  splitOrders() {
    this.spinner.show();
    console.log(this.splitTotal);
    let currentRegister: string;
    let prods: any;
    for (let order of this.splitTotal) {
      currentRegister = order.Store;
      this.service.CTUpdateVendOrder(this.OrderNo, this.splitTotal)
      .subscribe((cat: any) => {
        console.log(cat);
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
      console.log(order.SKU);

    }



    // this.newFold.push({
    //   OrderId: this.OrderId,
    //   FoldStore: 'Chekkers',
    //   FoldComments: 'Some comments',
    // });
    // this.service.CTUpdateVendOrder(this.OrderNo, SKU, this.newFold)
    //   .subscribe((cat: any) => {
    //     console.log(cat);
    //     this.spinner.hide();
    //   },
    //     (err) => {
    //       console.log(err);
    //       this.spinner.hide();
    //     });
    this.spinner.hide();
  }

}
