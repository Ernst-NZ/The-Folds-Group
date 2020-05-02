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
    console.log(this.globals.loginUser);
  }

}
