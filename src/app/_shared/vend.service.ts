import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from '../globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendService {
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

//  getASPUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.rootURL + '/Users/SPGetUsers');
//   }

//   gettest(): Observable<any[]> {
//     return this.http.get<any[]>(
//      'https://9090c9c4613998cb4e061f4255c95827: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@holdstest.myshopify.com/admin/orders.json?limit=250'
//       );
//   }

//   vendTest(): Observable<any> {
//     const accessToken = '4DbmXm5QdMr12HuLpDhOl_dLhdnn6gIRvW0Z1Y8f';
//     const reqHeader2 = new HttpHeaders({ Authorization: 'Bearer ' + accessToken });
//     return this.http.post('https://foldtest.vendhq.com/api/2.0/retailer', {
//       headers: reqHeader2
//     });
//   }


}
