import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/_shared/shopify.service';
import { VendService } from 'src/app/_shared/vend.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-blank',
  templateUrl: './menu-blank.component.html',
  styleUrls: ['./menu-blank.component.scss']
})
export class MenuBlankComponent implements OnInit {
  private service: ShopifyService;
  count: any;
  totalOrders: number;


  constructor(
    service: ShopifyService,
    vendService: VendService,
    public globals: Globals,
    private router: Router
  ) {
    this.service = service;
   }

   ngOnInit(): void {
    // if (!this.globals.download) {
    //   this.service.getTotal()
    //       .subscribe((cat: any[]) => {
    //         this.count = cat;
    //         this.totalOrders = this.count['count'];
    //       },
    //       (err) => {
    //         console.log(err);
    //       });
    // }
  }

  login() {
    this.router.navigate(['/login/']);
  }

}
