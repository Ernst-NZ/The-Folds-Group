import { Component, OnInit } from '@angular/core';
import { ShopifyService } from '../_shared/shopify.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  private service: ShopifyService;
  captures: any[] = [];

  constructor(
    service: ShopifyService,
  ) {
    this.service = service;
  }

  ngOnInit(): void {
  }

  testSub() {
    this.captures.push({
      Store: 'Brooklyn',
      ShippingCost: 111,
      Paypal: 222,
    });

    console.log(this.captures);
    this.service.testPut('1242', this.captures)
      .subscribe((cat: any) => {
        console.log(cat);
      },
        (err) => {
          console.log(err);
        });
  }
}
