import { Component, OnInit } from '@angular/core';
import { ShopifyService } from '../_shared/shopify.service';
import { VendService } from '../_shared/vend.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private service: ShopifyService;
  private vendService: VendService;
  orderList: any;
  totalOrders: number;

  constructor(
    service: ShopifyService,
    vendService: VendService,
    public globals: Globals
  ) {
    this.service = service;
    this.vendService = vendService;
   }

  ngOnInit(): void {
    if (!this.globals.download) {
      this.orderList = JSON.parse(this.globals.shopify);
      this.totalOrders = (Object.keys(this.orderList.orders).length);
      this.globals.download = true;
    }
  }

  getOrders() {
    console.log(1);
    this.orderList = JSON.parse(this.globals.shopify);
    this.service.getorders()
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

  getOrders2() {
    console.log(1);
    this.vendService.vendTest()
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

  getOrders3() {
    console.log(100);
   // this.orderList = JSON.parse(this.globals.shopOrders);
    this.orderList = JSON.parse(this.globals.shopifyShort);
    console.log(this.orderList);
    console.log(Object.keys(this.orderList.orders).length);

  }
}
