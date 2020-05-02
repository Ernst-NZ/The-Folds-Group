import { Component, OnInit } from '@angular/core';
import { ShopifyService } from '../../_shared/shopify.service';
import { VendService } from '../../_shared/vend.service';
import { Globals } from '../../globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-auth',
  templateUrl: './menu-auth.component.html',
  styleUrls: ['./menu-auth.component.scss']
})
export class MenuAuthComponent implements OnInit {
  private service: ShopifyService;
  private vendService: VendService;
  orderList: any;
  count: any;
  totalOrders: number;
  download: string;

  constructor(
    service: ShopifyService,
    vendService: VendService,
    public globals: Globals,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.service = service;
    this.vendService = vendService;
   }

  ngOnInit(): void {
    if (!this.globals.download) {
      this.globals.isSyncing = true;
      this.spinner.show();
      this.service.getTotal()
          .subscribe((cat: any[]) => {
            this.count = cat;
            if (this.count['count']) {}
            this.totalOrders = this.count['count'];
            this.globals.isSyncing = false;
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.globals.isSyncing = false;
            this.spinner.hide();
          });
    }
  }

  getOrders() {
    // console.log(1);
    // this.globals.isSyncing = true;
    // this.spinner.show();
    // this.orderList = JSON.parse(this.globals.shopify);
    // this.service.getorders(this.totalOrders.toString())
    //     .subscribe((cat: any[]) => {
    //       console.log(cat);
    //       this.totalOrders = null;
    //       this.download = cat.toString();
    //       this.globals.isSyncing = false;
    //       this.spinner.hide();
    //     },
    //     (err) => {
    //       console.log(4);
    //       console.log(err);
    //       this.globals.isSyncing = false;
    //       this.spinner.hide();
    //     });
  }

  SPGetOrders() {
    this.router.navigate(['/orderMenu/']);
  }



  getOrders3() {
    console.log(1);
    this.service.getTest('detail')
        .subscribe((cat: any[]) => {
          console.log(3);
          (this.orderList = cat);
          console.log(this.orderList);
        },
        (err) => {
          console.log(4);
          console.log(err);
        });

  }

}
