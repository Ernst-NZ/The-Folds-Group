export interface IUser {
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CompanyCode: string;
  RoleCode: string;
}

export class User implements IUser {
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CompanyCode: string;
  RoleCode: string;
}
