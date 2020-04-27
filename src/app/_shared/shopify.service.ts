import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from '../globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {
  reqHeader: any;
  editHeader: any;
  testHeader: any;
  shopOrders: any[];

  readonly rootURL = this.globals.dataSource + '/api';
  constructor(
    private http: HttpClient,
    private globals: Globals) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded',
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });
    this.editHeader = new HttpHeaders({ 'No-Auth': 'True' });
 }

 getASPUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.rootURL + '/Users/SPGetUsers');
  }

  getorders(): Observable<any[]> {
    console.log(2);
    return this.http.get<any[]>(
     'https://9090c9c4613998cb4e061f4255c95827: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@holdstest.myshopify.com/admin/orders.json?limit=250'
      );
  }

  getorders2(): Observable<any[]> {
    console.log('Orders 2',  2);
    return this.http.get<any>(
     'https://750d4800b3a3c941d29823e4c00de88c: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@holdstest.myshopify.com/admin/api/2020-04/orders.json'
      );
  }
  getorders3(): Observable<any[]> {
    console.log('Orders 2',  2);
    return this.http.get<any>(
     `https://750d4800b3a3c941d29823e4c00de88c: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@
     holdstest.myshopify.com/admin/api/2020-04/orders/count.json?since_id=123`
      );
  }
}
