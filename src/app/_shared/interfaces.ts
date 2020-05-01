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

export interface IShopOrders {
  ShopId: number;
  OrderId: string;
  OrderNumber: string;
  OrderDate: string;
  OrderCustomer: string;
  OrderPayment: string;
  OrderFulfillment: string;
  OrderTotal: number;
  OrderItemTotal: string;
  OrderShipping: boolean;
  Download: string;
  FoldStore: string;
  FoldStatus: string;
  FoldShipDate: string;
}

export class ShopOrders implements IShopOrders {
  ShopId: number;
  OrderId: string;
  OrderNumber: string;
  OrderDate: string;
  OrderCustomer: string;
  OrderPayment: string;
  OrderFulfillment: string;
  OrderTotal: number;
  OrderItemTotal: string;
  OrderShipping: boolean;
  Download: string;
  FoldStore: string;
  FoldStatus: string;
  FoldShipDate: string;
}
