import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
//  dataSource: String =  'https://data.nzsats.co.nz'
//  dataSource: 'http://testdata.nzsats.co.nz';
 dataSource = 'https://fold.ezy.kiwi/';
// dataSource = 'http://localhost:52783';
//  dataSource: String = 'http://localhost:3000';
  userName: string;
  FirstName: string;
  userCode: string;
  authenticate = false;
  loginUser = false;
  userRole: string;
  companyCode: string;
  companyName: string;
  isSyncing = false;
  users: string;
  download = false;

  BrookLyn = '06c2f1bf-e9ca-11e9-efcf-a8ce25cb2360';
  Howard = '06c2f1bf-e94b-11e9-efcf-a8ce42fd7e01';
  GoodLad = '06c2f1bf-e94b-11e9-efcf-a8ce4cff8359';
  West = '06c2f1bf-e94b-11ea-efcf-486213ba08d0';
  ShopifyOnline = '069db350-8d4b-11ea-f6a9-743e3bc9baab';
}
