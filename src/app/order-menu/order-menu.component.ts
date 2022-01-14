import { Component, OnInit, ɵConsole } from '@angular/core';
import {
  IShopOrders,
  ShopOrders,
  ICostReport,
  CostReport,
} from '../_shared/interfaces';
import { ShopifyService } from '../_shared/shopify.service';
import { Globals } from '../globals';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/_shared/dateformat';
import { SorterService } from '../_shared/sorter.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
})
export class OrderMenuComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  private service: ShopifyService;
  orderList: Array<IShopOrders> = [];
  tempOrder: ShopOrders = new ShopOrders();
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;
  report: Array<ICostReport> = [];
  newReport: ICostReport = new CostReport();
  oldReport: any;
  date: { year: number; month: number };
  selectedFromDate: any;
  selectedToDate: any;
  lastMonth: any;
  pendingDate = false;
  oldFrom: any;
  oldTo: any;
  outstanding = false;
  shipped = false;
  shipLOCK = false;
  closeResult: string;
  filteredText: any;
  tempSplit: any[] = [];
  splitTotal: any[] = [];
  captures: any[] = [];
  newFold: any[] = [];
  allocatedOrder: any[] = [];
  newCost: any[] = [];
  newSplit: any[] = [];
  searchText = '';
  allocatedStore = '';
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
  errors: any;
  ReadyForPost = false;
  orderCost = 0;
  orderPrice = 0;
  orderTax = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    service: ShopifyService,
    public globals: Globals,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private sorterService: SorterService,
    private http: HttpClient
  ) {
    this.service = service;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.service.SPGetOrders().subscribe(
      (cat: IShopOrders[]) => {
        this.orderList = cat;
        this.filteredText = this.orderList;
        // console.log(this.orderList);
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );

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
    this.searchText = event;
  }

  refreshData() {
    this.spinner.show();
    this.newCost = [];
    this.service.SPGetOrders().subscribe(
      (cat: IShopOrders[]) => {
        this.orderList = cat;
        this.filteredText = this.orderList;
        this.preFilter();
        if (this.searchText) {
          this.filter(this.searchText);
        }
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  getFold(rowIndex) {
    //    console.log(rowIndex);
    // this.spinner.show();
    this.oldReport = this.filteredText[rowIndex];
    //  console.log(this.oldReport);
    // console.log(136, CheckId);
    // this.service.getFolds(CheckId).subscribe(
    //   (check: any[]) => {
    //     if (check) {
    //       this.oldReport = check;
    //       console.log(this.oldReport);
    //       this.spinner.hide();
    //     }
    //   },
    //   error => {
    //     this.errors = error;
    //     console.log(this.errors);
    //   }
    // );
  }

  clearOldReport() {
    this.oldReport = new CostReport();
  }

  updateFold() {
    this.spinner.show();
    this.newCost.push({
      Store: this.oldReport.FoldStore,
      ShippingCost: this.oldReport.FoldShippingCost,
      Paypal: this.oldReport.FoldPaypal,
    });
    //  console.log(this.newCost);
    this.service.updateCost(this.oldReport.OrderNumber, this.newCost).subscribe(
      (cat: any) => {
        this.refreshData();
        //    console.log(cat);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filter(event) {
    if (event) {
      const data = event;
      this.filteredText = this.filteredText.filter((fullText: IShopOrders) => {
        return (
          fullText.OrderNumber.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderDate.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderCustomer.toLowerCase().indexOf(data.toLowerCase()) >
            -1 ||
          fullText.FoldStatus.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.FoldStore.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          fullText.OrderTotal.toString()
            .toLowerCase()
            .indexOf(data.toLowerCase()) > -1 ||
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
    this.shipped = false;
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
      this.shipped ||
      this.selectedToDate ||
      this.selectedFromDate
    ) {
      this.filterPromise();
    } else {
      console.log('NO Filter');
      this.filteredText = this.orderList;
    }
  }

  formatDate(temp: string) {
    const tmp = temp.split('/');
    const date = tmp[0] + '/' + tmp[1] + '/' + tmp[2];
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
        let temp;
        this.captures = [];
        //  if (this.MultiOrders[n].Brooklyn >= ordered && this.MultiOrders[n].ItemSKU !== 'Total') {
        temp = this.StoreList(
          'Brooklyn',
          this.MultiOrders[n].Brooklyn,
          this.MultiOrders[n].ItemSKU
        );
        this.MultiOrders[n].Store = temp;
        //  }
        //  if (this.MultiOrders[n].GoodLad >= ordered) {
        temp = this.StoreList(
          'GoodLad',
          this.MultiOrders[n].GoodLad,
          this.MultiOrders[n].ItemSKU
        );
        this.MultiOrders[n].Store = temp;
        //  }
        //  if (this.MultiOrders[n].Howard >= ordered) {
        temp = this.StoreList(
          'Howard',
          this.MultiOrders[n].Howard,
          this.MultiOrders[n].ItemSKU
        );
        this.MultiOrders[n].Store = temp;
        //  }
        //  if (this.MultiOrders[n].West >= ordered) {
        temp = this.StoreList(
          'West',
          this.MultiOrders[n].West,
          this.MultiOrders[n].ItemSKU
        );
        this.MultiOrders[n].Store = temp;
        //  }
        //  if (this.captures.length < 1) {
        temp = this.StoreList('Not In Stock', 0, this.MultiOrders[n].ItemSKU);
        this.MultiOrders[n].Store = temp;
        // }
      }
    }
  }

  async filterPromise(): Promise<void> {
  //  console.log('start filter');
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
        return fullText.FoldStore === 'Multiple Stores';
      });
    }
    if (this.shipped) {
      this.filteredText = this.filteredText.filter((fullText: any) => {
        return !fullText.FoldShippingCost && fullText.FoldShippingCost !== 0;
      });
    }
    if (this.searchText) {
      this.filter(this.searchText);
    }
  }

  getOrder(orderid: string) {
//    console.log(orderid);
    let orderAddress = 'https://thefoldgroup.myshopify.com/admin/orders/';
    orderAddress = orderAddress.concat(orderid);
    window.open(orderAddress, '_blank');
  }

  xx(tempList: any) {
    if (this.Allocated) {
      for (let n = 0; n < tempList.length; n++) {
      //  console.log('tempList', tempList);
      //  console.log(n, tempList[n]['ItemSKU']);
        let xx = this.allocatedOrder.find(
          (record) => record.FoldItemSKU === tempList[n]['ItemSKU']
        );
        if (xx) {
    //      console.log(xx['FoldStore']);
          if (xx['FoldStore'] !== this.allocatedStore) {
    //        console.log('remove line ', n, tempList[n]['ItemSKU']);
            // this.MultiOrders.splice(n, 1);           
            //  tempList.splice(n, 1);

          } else {
    //        console.log('Store is the same', n, tempList[n]['ItemSKU']);
            this.newSplit.push({
              Store: tempList[n]['Store'],
              ItemId: tempList[n]['ItemId'],
              ItemSKU: tempList[n]['ItemSKU'],
              LastSale: tempList[n]['LastSale'],
              Brooklyn: tempList[n]['Brooklyn'],
              GoodLad: tempList[n]['GoodLad'],
              Howard: tempList[n]['Howard'],
              West: tempList[n]['West'],
            });
     //       console.log('PUSH',n, this.newSplit);
          }
        } else {
 //         console.log('Item not found', n, tempList['ItemSKU']);
        }
      }
      this.MultiOrders =  this.newSplit;
    }
    
  }

  openComments(comments, i: any) {
    this.newSplit = [];
    this.shipLOCK = false;
    if (i.FoldShippingCost || i.FoldShippingCost === 0) {
      this.shipLOCK = true;
    }
    this.splitTotal = [];
    this.ReadyForPost = false;
    this.tempSplit = [];
    this.OrderItemTotal = i.OrderItemTotal;
    this.OrderNo = i.OrderNumber;
    this.OrderId = i.OrderId;
    this.spinner.show();
    this.allocatedStore = i.FoldStore;
    if (
      i.FoldStatus !== 'Fulfilled' &&
      i.FoldStore !== 'NO SKU' &&
      i.FoldStore !== 'Multiple Stores'
    ) {
      this.Allocated = true;
      this.service.SPGetAllocatedOrder(i.OrderNumber).subscribe(
        (cat: any) => {
          this.allocatedOrder = cat;
          console.log('Allocated Order', this.allocatedOrder);          
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
    } else {
      this.Allocated = false;
    }

    this.FoldComments = i.FoldComments;
    this.spinner.show();
    this.service.CTGetMultiOrders_Static(i.OrderNumber).subscribe(
      (cat: any) => {
        this.MultiOrders = cat;
        console.log('cat Start', cat);
        console.log('Multi Start', this.MultiOrders);
        this.getStore();
        const temp = cat;
        this.xx(temp);

        console.log(this.MultiOrders)
        this.modalService
          .open(comments, { ariaLabelledBy: 'modal-basic-title' })
          .result.then(
            (result) => {
              this.closeResult = `Closed with: ${result}`;
              this.MultiOrders = '';
              this.Allocated = false;
            },
            (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              this.MultiOrders = '';
              this.Allocated = false;
            }
          );



        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
    
     console.log(this.MultiOrders)
    // this.modalService
    //   .open(comments, { ariaLabelledBy: 'modal-basic-title' })
    //   .result.then(
    //     (result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //       this.MultiOrders = '';
    //       this.Allocated = false;
    //     },
    //     (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //       this.MultiOrders = '';
    //       this.Allocated = false;
    //     }
    //   );
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
    if (this.splitTotal.find((s) => s.Store === store)) {
      let i = 0;
      let stores = 0;
      for (i = 0, stores = this.splitTotal.length; i < stores; i++) {
        if (this.splitTotal[i].Store === store) {
          this.splitTotal[i].Items = +this.splitTotal[i].Items + 1;
          this.splitTotal[i].SKUList = this.splitTotal[i].SKUList.concat(
            ', ',
            sku
          );
        }
      }
    } else {
      this.splitTotal.push({
        Store: store,
        Items: 1,
        SKUList: sku,
        orderCost: this.orderCost,
        orderPrice: this.orderPrice,
        orderTax: this.orderTax,
        OrderId: '',
      });
    }
  }

  // get the list of registers and SKU numbers
  StoreSplit(store: string, sku: string) {
    const stock = store.substring(0, 1);
    const n = store.indexOf('-') + 2;
    store = store.substring(n);
    if (store === 'Not In Stock' || stock === '0') {
      store = 'REFUND';
    }
    if (this.tempSplit.find((s) => s.SKU === sku)) {
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
    if (args.target.value !== '9999' && (!this.shipLOCK || this.globals.FirstName === "Ernst")) {
      this.StoreSplit(
        args.target.options[args.target.selectedIndex].text,
        args.target.value
      );
    }
  }

  getCurrent() {
    this.spinner.show();
    this.service.CTGetMultiOrders(this.OrderNo).subscribe(
      (cat: any) => {
        this.MultiOrders = cat;
        this.getStore();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  openVend() {
    this.spinner.show();
    let VendId: string;
    this.service.CTGetVendID(this.OrderNo).subscribe(
      (cat: any) => {
        VendId = cat;
        this.spinner.hide();
        console.log(VendId);
        let orderAddress = 'https://thefold.vendhq.com/history?date_from_offset=-780&&date_to_offset=-780&receipt_number=';
//        orderAddress = orderAddress.concat(VendId);
        orderAddress = orderAddress.concat(this.OrderNo);
        window.open(orderAddress, '_blank');
        //    https://thefold.vendhq.com/history#59423c0f-8e53-b7a4-11ea-94a123b534f8
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  testSingle(targetStore: string) {
    // Get the current Order
    // Loop through the Total table
    // Total table has the products by Store
    // Grab the firts store
    // Loop through the Order and remove Products that is not linked to the specific store
    //  targetStore = 'Brooklyn';
    this.spinner.show();
    this.Allocated = false;
    let i = 0;
    let stores = 0;
    this.service.CTGetVendOrder(this.OrderNo).subscribe(
      (cat: any) => {
        //  return;
        this.VendMaster = cat;
        this.VendProducts = this.VendMaster.register_sale_products;
        let currentRegister: string;
        let currentProds = [];
        for (let n = 0; n < this.splitTotal.length; n++) {
          this.VendTemp = this.VendMaster;
          currentRegister = this.splitTotal[n].Store;
          currentProds = this.splitTotal[n].SKUList;
          if (this.splitTotal[n].Store === targetStore) {
            this.splitOrder(currentRegister, currentProds);
            for (i = 0, stores = this.splitTotal.length; i < stores; i++) {
              if (this.splitTotal[i].Store === targetStore) {
                this.splitTotal[i].Processed = 'Checked';
                this.splitTotal[i].NewOrder = this.VendTemp;
                this.splitTotal[i].orderId = this.VendMaster.id;
                this.splitTotal[i].orderCost = this.orderCost;
                this.splitTotal[i].orderPrice = this.orderPrice;
                this.splitTotal[i].orderTax = this.orderTax;
              }
            }
            this.splitTotal[n].orderId = this.VendMaster.id;
            this.splitTotal[n].orderCost = this.orderCost;
            this.splitTotal[n].orderPrice = this.orderPrice;
            this.splitTotal[n].orderTax = this.orderTax;
            this.splitTotal[n].SKUList = this.splitTotal[n].SKUList.concat(
              ', ',
              'FreeStandardShippingPromo'
            );
          }
        }
        this.checkForPost();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  splitOrder(register: string, prods: any) {
    this.spinner.show();
    prods = prods.concat(', ', 'FreeStandardShippingPromo');
    const products = this.VendTemp.register_sale_products;
    for (let n = 0; n < products.length; n++) {
      const substrings = prods.split(', ');
      const str = products[n].sku;
      if (new RegExp(substrings.join('|')).test(str)) {
        // console.log(products[n]);
        // console.log(products[n].cost);
        this.orderCost = this.orderCost + products[n].cost;
        this.orderPrice = this.orderPrice + products[n].price_total;
        this.orderTax = this.orderTax + products[n].tax_total;
      } else {
        this.VendTemp.register_sale_products.splice(n, 1, {});
      }
    }
    switch (register) {
      case 'Brooklyn': {
        this.VendTemp.register_id = this.globals.BrookLyn;
        this.VendTemp.user_id = '069db350-8d4b-11ea-f6a9-88b84379ba3d';
        this.VendTemp.user_name = 'WEB B';
        break;
      }
      case 'GoodLad': {
        this.VendTemp.register_id = this.globals.GoodLad;
        this.VendTemp.user_id = '069db350-8d4b-11ea-f6a9-84dd2bd26074';
        this.VendTemp.user_name = 'WEBG';
        break;
      }
      case 'Howard': {
        this.VendTemp.register_id = this.globals.Howard;
        this.VendTemp.user_id = '069db350-8d4b-11ea-f6a9-84dbb4b256b6';
        this.VendTemp.user_name = 'WEB H';
        break;
      }
      case 'West': {
        this.VendTemp.register_id = this.globals.West;
        this.VendTemp.user_id = '069db350-8d4b-11ea-f6a9-8363ac0c55cf';
        this.VendTemp.user_name = 'WEB W';
        break;
      }
      default: {
        // this.VendTemp.register_id = this.globals.ShopifyOnline;
        // this.VendTemp.user_id = '069db350-8d4b-11ea-f6a9-88b84379ba3d';
        // this.VendTemp.user_name = 'WEB B';
        break;
      }
    }
    // this.VendTemp.id = '';
    this.VendTemp.register_sale_payments[0].amount = this.orderPrice;
    this.VendTemp.total_cost = this.orderCost;
    this.VendTemp.total_price = this.orderPrice;
    this.VendTemp.total_tax = this.orderTax;
    this.VendTemp.totals.total_payment = this.orderPrice + this.orderTax;
    this.VendTemp.totals.total_price = this.orderPrice;
    this.VendTemp.totals.total_tax = this.orderTax;

    this.spinner.hide();
    // return products;
  }

  checkForPost() {
    for (const order of this.splitTotal) {
      this.ReadyForPost = true;
      if (!order.Processed) {
        this.ReadyForPost = false;
      }
    }
  }

  splitOrders() {
    this.spinner.show();
    for (let n = 0; n < this.splitTotal.length; n++) {
      this.VendMaster.note = 'Order_Test_Shopify';
    }
 //   console.log(this.OrderNo, this.splitTotal);
    this.service.CTUpdateVendOrder(this.OrderNo, this.splitTotal).subscribe(
      (cat: any) => {
        this.refresh();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  refresh() {
    this.spinner.show();
    this.service.getorders().subscribe(
      (cat: any[]) => {
        this.service.SPGetOrders().subscribe(
          (cat: IShopOrders[]) => {
            this.orderList = cat;
            this.filteredText = this.orderList;
            this.preFilter();
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
      },
      (err) => {
        console.log('##### ERROR', err);
        this.spinner.hide();
      }
    );
  }
}
