import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
//  dataSource: String =  'https://data.nzsats.co.nz'
//  dataSource: 'http://testdata.nzsats.co.nz';
//  dataSource: 'http://fold.ezy.kiwi/';
 dataSource: 'http://localhost:52783';
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
}
