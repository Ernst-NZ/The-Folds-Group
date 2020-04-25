import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
//  dataSource: String =  'https://data.nzsats.co.nz'
  dataSource: 'https://testdata.nzsats.co.nz';
// dataSource: String = 'http://localhost:52783';
//  dataSource: String = 'http://localhost:3000';
  userName: string;
  userCode: string;
  authenticate = false;
  loginUser = false;
  userRole: string;
  companyCode: string;
  companyName: string;
  isSyncing = false;
  users: string;
}
