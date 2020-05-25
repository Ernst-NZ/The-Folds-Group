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
  FoldComments: string;
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
  FoldComments: string;
}

export interface ICostReport {
  OrderDate: string;
  FoldStore: string;
  OrderId: string;
  VendCost: number;
  Shopify30: number;
  Shopify29: number;
  Paypal: number;
  ShippingCost: number;
  TotalDue: number;
  editing: boolean;
}

export class CostReport implements ICostReport {
  OrderDate: string;
  FoldStore: string;
  OrderId: string;
  VendCost: number;
  Shopify30: number;
  Shopify29: number;
  Paypal: number;
  ShippingCost: number;
  TotalDue: number;
  editing: boolean;
}
