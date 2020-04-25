export interface IWebUser {
  Username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CompanyCode: string;
  RoleCode: string;
  CompanyName: string;
}

export class WebUser implements IWebUser {
  Username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CompanyCode: string;
  RoleCode: string;
  CompanyName: string;
}
