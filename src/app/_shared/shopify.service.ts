import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from '../globals';
import { Observable } from 'rxjs';
import { ICostReport } from './interfaces';

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
    return this.http.get<any>(this.rootURL + '/MultiStore/' + OrderNo);
  }

  CTGetMultiOrders_Static(OrderNo: string): Observable<any> {
    return this.http.get<any>(this.rootURL + '/MultiStore_Static/' + OrderNo);
  }

  CTGetVendID(OrderNo: string): Observable<string> {
    return this.http.get<string>(this.rootURL + '/OpenVend/' + OrderNo);
  }

  CTGetVendOrder(OrderID: string): Observable<string> {
    return this.http.get<string>(this.rootURL + '/GetVendOrder/' + OrderID);
  }

  CTUpdateVendOrder(orderNo: string, splitTotal: any) {
    return this.http.put(this.rootURL + '/VendUpdates/' + orderNo, splitTotal);
  }

  CTVendTest(orderNO: string, splitTotal: any) {
    return this.http.put(this.rootURL + '/VendTest/' + orderNO,   splitTotal);
  }

  SPGetCostReport() {
    return this.http.get(this.rootURL + '/CostReport/');
  }

  getFolds(FoldId: number) {
    return this.http.get(this.rootURL + '/Folds/' + FoldId);
  }

   // Edit one
   putFolds(editFold: any) {
    console.log(editFold);
    return this.http.put(this.rootURL + '/Folds/' + editFold.FoldId, editFold );
  }

  putxxx(formRole: any) {
    return this.http.post(this.rootURL + '/roles/' + formRole.Id, formRole);
  }
}
