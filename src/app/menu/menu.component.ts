import { Component, OnInit } from '@angular/core';
import { ShopifyService } from '../_shared/shopify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private service: ShopifyService;
  orderList: Array<any> = [];

  constructor(
    service: ShopifyService,
  ) {
    this.service = service;
   }

  ngOnInit(): void {
  }

  getOrders() {
    console.log(1);
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
    this.service.getorders2()
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
    console.log(1);
    this.service.getorders3()
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
