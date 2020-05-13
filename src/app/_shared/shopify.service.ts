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

  getTotal(): Observable<any> {
    console.log('Get Total Service');
    return this.http.get<any>(this.rootURL + '/ShopifyTotal/');
  }

  getTest(endPoint: string): Observable<any> {
    console.log(2);
    return this.http.get<any>(this.rootURL + '/shopOrders/');
  }

  getorders(): Observable<any> {
    console.log('Get Total Service');
    return this.http.get<any>(this.rootURL + '/ShopifyGetOrder');
  }

  SPGetOrders(): Observable<any> {
    console.log('Get Total Service');
    return this.http.get<any>(this.rootURL + '/SPGetOrders/');
  }

  CTGetMultiOrders(OrderNo: string): Observable<any> {
    console.log('Get Multi Orders', OrderNo);
    return this.http.get<any>(this.rootURL + '/MultiStore/' + OrderNo);
  }

  CTGetMultiOrders_Static(OrderNo: string): Observable<any> {
    console.log('Get Multi Orders', OrderNo);
    return this.http.get<any>(this.rootURL + '/MultiStore_Static/' + OrderNo);
  }

  CTGetVendID(OrderNo: string): Observable<string> {
    console.log('Get VendId', OrderNo);
    return this.http.get<string>(this.rootURL + '/OpenVend/' + OrderNo);
  }



}
