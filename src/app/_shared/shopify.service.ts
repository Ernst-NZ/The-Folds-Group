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
  shopOrders: any;

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

 getASPUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.rootURL + '/Users/SPGetUsers');
  }

  getorders(): Observable<any[]> {
    console.log(2);
    return this.http.get<any[]>(
     `https://9090c9c4613998cb4e061f4255c95827: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
     @holdstest.myshopify.com/admin/orders.json?limit=250`
      );
  }

  getorders2(): Observable<any[]> {
    console.log('Orders 2',  2);
    return this.http.get<any>(
     `https://750d4800b3a3c941d29823e4c00de88c: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
     @holdstest.myshopify.com/admin/api/2020-04/orders.json`
      );
  }
  getorders3(): Observable<any[]> {
    this.shopOrders = `{
      "orders":[
        {"id":2150220267638,"email":"ernst@ezy.kiwi",
        "closed_at":null,"created_at":"2020-04-21T14:38:45+12:00",
        "updated_at":"2020-04-21T14:38:46+12:00",
        "number":3,"note":null,
        "token":"93b400518f3c53b0c4ecaed535a3f09f",
        "gateway":"shopify_payments",
        "test":true,"total_price":"97.75",
        "subtotal_price":"85.00",
        "total_weight":1150,
        "total_tax":"12.75","taxes_included":false,
        "currency":"NZD","financial_status":"paid",
        "confirmed":true,"total_discounts":"0.00",
        "total_line_items_price":"85.00",
        "cart_token":"244ecbb88763264337245586d5eb7e0a",
        "buyer_accepts_marketing":false,"name":"#1003",
        "referring_site":"",
        "landing_site":"\/admin\/auth\/login?login=ernst@ezy.kiwi\u0026from_signup=true",
        "cancelled_at":null,"cancel_reason":null,
        "total_price_usd":"58.80",
        "checkout_token":"8c1d35cef11efbc53e889e857376bb46","reference":null,
        "user_id":null,"location_id":null,"source_identifier":null,
        "source_url":null,"processed_at":"2020-04-21T14:38:45+12:00",
        "device_id":null,"phone":null,"customer_locale":"en",
        "app_id":580111,"browser_ip":"203.211.92.177",
        "landing_site_ref":null,"order_number":1003,
        "discount_applications":[],
        "discount_codes":[],
        "note_attributes":[],
        "payment_gateway_names":["shopify_payments"],
        "processing_method":"direct",
        "checkout_id":13178727137398,"source_name":"web",
        "fulfillment_status":null,
        "tax_lines":[
          {"price":"12.75","rate":0.15,"title":"GST",
          "price_set":{
            "shop_money":{
              "amount":"12.75","currency_code":"NZD"},
              "presentment_money":
              {"amount":"12.75","currency_code":"NZD"}
            }
          }
        ],
        "tags":"","contact_email":"ernst@ezy.kiwi","order_status_url":
        "https:\/\/holdstest.myshopify.com\/27158151286\/orders\/93b400518f3c53b0c4ecaed535a3f09f\/authenticate?
        key=2bcbf4ac6b0bdde58353989ed5050ed5",
        "presentment_currency":"NZD",
        "total_line_items_price_set":{
          "shop_money":{
            "amount":"85.00","currency_code":"NZD"}
            ,"presentment_money":{
              "amount":"85.00","currency_code":"NZD"
            }
          },
          "total_discounts_set":{
            "shop_money":{
              "amount":"0.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"0.00","currency_code":"NZD"
            }
          },"total_shipping_price_set":{
            "shop_money":{
              "amount":"0.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"0.00","currency_code":"NZD"
            }
          },
          "subtotal_price_set":{
            "shop_money":{
              "amount":"85.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"85.00","currency_code":"NZD"
            }
          },
          "total_price_set":{
            "shop_money":{
              "amount":"97.75","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"97.75","currency_code":"NZD"
            }
          },
          "total_tax_set":{
            "shop_money":{
              "amount":"12.75","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"12.75","currency_code":"NZD"
            }
          },
          "line_items":[
            {"id":4747930435702,"variant_id":31602854854774,
            "title":"Short 2","quantity":1,
            "sku":"SKU 0002","variant_title":"","vendor":"HoldsTest",
            "fulfillment_service":"manual",
            "product_id":4465416863862,
            "requires_shipping":true,"taxable":true,
            "gift_card":false,"name":"Short 2",
            "variant_inventory_management":"shopify",
            "properties":[],"product_exists":true,
            "fulfillable_quantity":1,"grams":250,
            "price":"25.00","total_discount":"0.00",
            "fulfillment_status":null,
            "price_set":{
              "shop_money":{
                "amount":"25.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"25.00","currency_code":"NZD"
              }
            },
            "total_discount_set":{
              "shop_money":{
                "amount":"0.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"0.00","currency_code":"NZD"
              }
            },
            "discount_allocations":[],
            "duties":[],
            "admin_graphql_api_id":"gid:\/\/shopify\/LineItem\/4747930435702",
            "tax_lines":[
              {
                "title":"GST","price":"3.75","rate":0.15,
                "price_set":{
                  "shop_money":{
                    "amount":"3.75","currency_code":"NZD"
                  },
                  "presentment_money":{
                    "amount":"3.75","currency_code":"NZD"
                  }
                }
              }
            ],
            "origin_location":{
              "id":1897698558070,"country_code":"NZ",
              "province_code":"BOP","name":"HoldsTest",
              "address1":"8 Amy Place","address2":"",
              "city":"Tauranga","zip":"3112"
            }
          },
          {"id":4747930468470,"variant_id":31602185601142,
          "title":"Shirt 1","quantity":3,
          "sku":"SKU0001","variant_title":"",
          "vendor":"HoldsTest","fulfillment_service":"manual",
          "product_id":4465282056310,
          "requires_shipping":true,"taxable":true,
          "gift_card":false,"name":"Shirt 1",
          "variant_inventory_management":"shopify",
          "properties":[],"product_exists":true,
          "fulfillable_quantity":3,
          "grams":300,"price":"20.00",
          "total_discount":"0.00","fulfillment_status":null,
          "price_set":{
            "shop_money":{
              "amount":"20.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"20.00","currency_code":"NZD"
            }
          },
          "total_discount_set":{
            "shop_money":{
              "amount":"0.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"0.00","currency_code":"NZD"
            }
          },
          "discount_allocations":[],
          "duties":[],
          "admin_graphql_api_id":"gid:\/\/shopify\/LineItem\/4747930468470",
          "tax_lines":[
            {
              "title":"GST","price":"9.00","rate":0.15,"price_set":{
                "shop_money":{
                  "amount":"9.00","currency_code":"NZD"
                },
                "presentment_money":{
                  "amount":"9.00","currency_code":"NZD"
                }
              }
            }
          ],
          "origin_location":{
            "id":1897698558070,"country_code":"NZ","province_code":"BOP",
            "name":"HoldsTest","address1":"8 Amy Place","address2":"",
            "city":"Tauranga","zip":"3112"
          }
        }
      ],
      "fulfillments":[],
      "refunds":[],
      "total_tip_received":"0.0",
      "original_total_duties_set":null,"current_total_duties_set":null,
      "admin_graphql_api_id":"gid:\/\/shopify\/Order\/2150220267638",
      "shipping_lines":[
        {
          "id":1791810437238,"title":"Standard",
          "price":"0.00","code":"Standard","source":"shopify",
          "phone":null,"requested_fulfillment_service_id":null,
          "delivery_category":null,"carrier_identifier":null,
          "discounted_price":"0.00","price_set":{
            "shop_money":{
              "amount":"0.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"0.00","currency_code":"NZD"
            }
          },
          "discounted_price_set":{
            "shop_money":{
              "amount":"0.00","currency_code":"NZD"
            },
            "presentment_money":{
              "amount":"0.00","currency_code":"NZD"
            }
          },
          "discount_allocations":[],
          "tax_lines":[]
        }
      ],
      "billing_address":{
        "first_name":"Ernst",
        "address1":"8 Amy Place",
        "phone":null,"city":"Tauranga",
        "zip":"3112","province":"Bay of Plenty","country":"New Zealand",
        "last_name":"Visser","address2":"","company":null,
        "latitude":-37.7410091,"longitude":176.1346778,
        "name":"Ernst Visser","country_code":"NZ","province_code":"BOP"
      },
      "shipping_address":{
        "first_name":"Ernst","address1":"8 Amy Place","phone":null,
        "city":"Tauranga","zip":"3112","province":"Bay of Plenty",
        "country":"New Zealand","last_name":"Visser",
        "address2":"","company":null,"latitude":-37.7410091,
        "longitude":176.1346778,"name":"Ernst Visser",
        "country_code":"NZ","province_code":"BOP"
      },
      "client_details":{
        "browser_ip":"203.211.92.177",
        "accept_language":"en-NZ,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "user_agent":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64)
        AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.163 Safari\/537.36",
        "session_hash":"2202ff609a75af42e936841cb94a4040",
        "browser_width":1506,"browser_height":959},
        "payment_details":{
          "credit_card_bin":"424242","avs_result_code":"Y","cvv_result_code":"M",
          "credit_card_number":"•••• •••• •••• 4242","credit_card_company":"Visa"
        },
        "customer":{
          "id":3035150057590,"email":"ernst@ezy.kiwi","accepts_marketing":false,
          "created_at":"2020-04-21T14:21:56+12:00","updated_at":"2020-04-21T14:38:46+12:00",
          "first_name":"Ernst","last_name":"Visser",
          "orders_count":0,"state":"disabled","total_spent":"0.00",
          "last_order_id":null,"note":null,"verified_email":true,
          "multipass_identifier":null,"tax_exempt":false,"phone":null,
          "tags":"","last_order_name":null,"currency":"NZD",
          "accepts_marketing_updated_at":"2020-04-21T14:21:56+12:00",
          "marketing_opt_in_level":null,
          "admin_graphql_api_id":"gid:\/\/shopify\/Customer\/3035150057590",
          "default_address":{
            "id":3514024591478,"customer_id":3035150057590,"first_name":"Ernst",
            "last_name":"Visser","company":null,"address1":"8 Amy Place","address2":"",
            "city":"Tauranga",
            "province":"Bay of Plenty",
            "country":"New Zealand","zip":"3112","phone":null,
            "name":"Ernst Visser","province_code":"BOP",
            "country_code":"NZ","country_name":"New Zealand","default":true
          }
        }
      },
      {
        "id":2150197756022,"email":"ernst@ezy.kiwi","closed_at":null,
        "created_at":"2020-04-21T14:22:44+12:00","updated_at":"2020-04-21T14:22:45+12:00",
        "number":1,"note":null,
        "token":"aee44b3c91e7fde1d9049d65fdb7b843","gateway":"shopify_payments",
        "test":true,"total_price":"23.00",
        "subtotal_price":"20.00","total_weight":300,"total_tax":"3.00",
        "taxes_included":false,"currency":"NZD",
        "financial_status":"paid","confirmed":true,
        "total_discounts":"0.00","total_line_items_price":"20.00",
        "cart_token":"","buyer_accepts_marketing":false,
        "name":"#1001",
        "referring_site":"https:\/\/holdstest.myshopify.com\/products\/shirt-1",
        "landing_site":"\/wallets\/checkouts.json","cancelled_at":null,
        "cancel_reason":null,"total_price_usd":"13.83",
        "checkout_token":"6e46a2bb2ffc77cf24d4b5575a72d8bc",
        "reference":null,"user_id":null,"location_id":null,"source_identifier":null,
        "source_url":null,"processed_at":"2020-04-21T14:22:43+12:00",
        "device_id":null,"phone":null,"customer_locale":"en",
        "app_id":580111,"browser_ip":"203.211.92.177",
        "landing_site_ref":null,"order_number":1001,
        "discount_applications":[],
        "discount_codes":[],
        "note_attributes":[],
        "payment_gateway_names":[
          "shopify_payments"
        ],
        "processing_method":"direct","checkout_id":13178420723830,"source_name":"web",
        "fulfillment_status":null,"tax_lines":[
          {
            "price":"3.00","rate":0.15,"title":"GST","price_set":{
              "shop_money":{
                "amount":"3.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"3.00","currency_code":"NZD"
              }
            }
          }
        ],
        "tags":"","contact_email":"ernst@ezy.kiwi",
        "order_status_url":"https:\/\/holdstest.myshopify.com\/27158151286\/orders\/aee44b3c91e7fde1d9049d65fdb7b843\/authenticate?
        key=201222cfd0287b7871a022dbe9c22dc4",
        "presentment_currency":"NZD",
        "total_line_items_price_set":{
          "shop_money":{
            "amount":"20.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"20.00","currency_code":"NZD"
          }
        },
        "total_discounts_set":{
          "shop_money":{
            "amount":"0.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"0.00","currency_code":"NZD"
          }
        },
        "total_shipping_price_set":{
          "shop_money":{
            "amount":"0.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"0.00","currency_code":"NZD"
          }
        },
        "subtotal_price_set":{
          "shop_money":{
            "amount":"20.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"20.00","currency_code":"NZD"
          }
        },
        "total_price_set":{
          "shop_money":{
            "amount":"23.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"23.00","currency_code":"NZD"
          }
        },
        "total_tax_set":{
          "shop_money":{
            "amount":"3.00","currency_code":"NZD"
          },
          "presentment_money":{
            "amount":"3.00","currency_code":"NZD"
          }
        },
        "line_items":[
          {
            "id":4747884691574,"variant_id":31602185601142,"title":"Shirt 1",
            "quantity":1,"sku":"SKU0001","variant_title":"","vendor":"HoldsTest",
            "fulfillment_service":"manual",
            "product_id":4465282056310,"requires_shipping":true,
            "taxable":true,"gift_card":false,
            "name":"Shirt 1","variant_inventory_management":"shopify",
            "properties":[],
            "product_exists":true,"fulfillable_quantity":1,
            "grams":300,"price":"20.00","total_discount":"0.00",
            "fulfillment_status":null,
            "price_set":{
              "shop_money":{
                "amount":"20.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"20.00","currency_code":"NZD"
              }
            },
            "total_discount_set":{
              "shop_money":{
                "amount":"0.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"0.00","currency_code":"NZD"
              }
            },
            "discount_allocations":[],
            "duties":[],
            "admin_graphql_api_id":"gid:\/\/shopify\/LineItem\/4747884691574",
            "tax_lines":[
              {
                "title":"GST","price":"3.00","rate":0.15,"price_set":{
                  "shop_money":{
                    "amount":"3.00","currency_code":"NZD"
                  },
                  "presentment_money":{
                    "amount":"3.00","currency_code":"NZD"
                  }
                }
              }
            ],
            "origin_location":{
              "id":1897698558070,"country_code":"NZ","province_code":"BOP",
              "name":"HoldsTest","address1":"8 Amy Place","address2":"",
              "city":"Tauranga","zip":"3112"
            }
          }
        ],
        "fulfillments":[],
        "refunds":[],
        "total_tip_received":"0.0","original_total_duties_set":null,
        "current_total_duties_set":null,
        "admin_graphql_api_id":"gid:\/\/shopify\/Order\/2150197756022",
        "shipping_lines":[
          {
            "id":1791789334646,"title":"Standard","price":"0.00",
            "code":"Standard","source":"shopify",
            "phone":null,"requested_fulfillment_service_id":null,
            "delivery_category":null,"carrier_identifier":null,
            "discounted_price":"0.00","price_set":{
              "shop_money":{
                "amount":"0.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"0.00","currency_code":"NZD"
              }
            },
            "discounted_price_set":{
              "shop_money":{
                "amount":"0.00","currency_code":"NZD"
              },
              "presentment_money":{
                "amount":"0.00","currency_code":"NZD"
              }
            },
            "discount_allocations":[],
            "tax_lines":[]
          }
        ],
        "billing_address":{
          "first_name":"Ernst","address1":"8 Amy Place","phone":null,
          "city":"Tauranga","zip":"3112","province":"Bay of Plenty",
          "country":"New Zealand","last_name":"Visser","address2":"",
          "company":null,"latitude":-37.7410091,"longitude":176.1346778,
          "name":"Ernst Visser","country_code":"NZ","province_code":"BOP"
        },
        "shipping_address":{
          "first_name":"Ernst","address1":"8 Amy Place","phone":null,
          "city":"Tauranga","zip":"3112","province":"Bay of Plenty",
          "country":"New Zealand","last_name":"Visser",
          "address2":"","company":null,"latitude":-37.7410091,
          "longitude":176.1346778,"name":"Ernst Visser",
          "country_code":"NZ","province_code":"BOP"
        },
        "client_details":{
          "browser_ip":"203.211.92.177",
          "accept_language":"en-NZ,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
          "user_agent":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64)
          AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.163 Safari\/537.36",
          "session_hash":null,"browser_width":1506,"browser_height":959
        },
        "payment_details":{
          "credit_card_bin":"424242","avs_result_code":"Y","cvv_result_code":"M",
          "credit_card_number":"•••• •••• •••• 4242","credit_card_company":"Visa"
        },
        "customer":{
          "id":3035150057590,"email":"ernst@ezy.kiwi","accepts_marketing":false,
          "created_at":"2020-04-21T14:21:56+12:00",
          "updated_at":"2020-04-21T14:38:46+12:00",
          "first_name":"Ernst","last_name":"Visser",
          "orders_count":0,"state":"disabled",
          "total_spent":"0.00","last_order_id":null,"note":null,
          "verified_email":true,"multipass_identifier":null,
          "tax_exempt":false,"phone":null,"tags":"","last_order_name":null,
          "currency":"NZD","accepts_marketing_updated_at":"2020-04-21T14:21:56+12:00",
          "marketing_opt_in_level":null,
          "admin_graphql_api_id":"gid:\/\/shopify\/Customer\/3035150057590",
          "default_address":{
            "id":3514024591478,"customer_id":3035150057590,"first_name":"Ernst",
            "last_name":"Visser","company":null,"address1":"8 Amy Place",
            "address2":"","city":"Tauranga","province":"Bay of Plenty",
            "country":"New Zealand","zip":"3112","phone":null,
            "name":"Ernst Visser","province_code":"BOP","country_code":"NZ",
            "country_name":"New Zealand","default":true}
          }
        }
      ]
    }`

    console.log('Orders 2',  2);
    return this.http.get<any>(
     `https://750d4800b3a3c941d29823e4c00de88c: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@
     holdstest.myshopify.com/admin/api/2020-04/orders/count.json?since_id=123`
      );
  }
}
