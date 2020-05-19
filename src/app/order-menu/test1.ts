// async filterPromise(): Promise<void> {
//   console.log('start filter');
//   this.filteredText = this.orderList;
//   // console.log(this.filteredText);

//   if (this.selectedFromDate) {
//     this.filteredText = this.filteredText.filter((fullText: any) => {
//       return +this.formatDate(fullText.OrderDate) >= +this.selectedFromDate;
//     });
//   }

//   if (this.selectedToDate) {
//     this.filteredText = this.filteredText.filter((fullText: any) => {
//       return +this.formatDate(fullText.OrderDate) <= +this.selectedToDate;
//     });
//   }

//   if (this.outstanding) {
//     this.filteredText = this.filteredText.filter((fullText: any) => {
//       return fullText.FoldStatus !== 'VOIDED' && fullText.FoldStatus !== 'CLOSED';
//     });
//   }
// }

// getOrder(orderid: string) {
//   let orderAddress = 'https://thefoldgroup.myshopify.com/admin/orders/';
//   orderAddress = orderAddress.concat(orderid);
//   window.open(orderAddress, '_blank');
// }

// openComments(comments, i: any, ) {
//   this.splitTotal = [];
//   this.tempSplit = [];
//   this.OrderItemTotal = i.OrderItemTotal;
//   this.OrderNo = i.OrderNumber;
//   this.OrderId = i.OrderId;
//   if (i.FoldStatus !== 'Fulfilled' && (i.FoldStore !== 'NO SKU' && i.FoldStore !== 'Multiple Stores')) {
//     this.Allocated = true;
//   } else {
//     this.Allocated = false;
//   }
//   this.FoldComments = i.FoldComments;
//   if (i.FoldStore === 'NO SKU' || i.FoldStore === 'Multiple Stores') {
//     this.spinner.show();
//     this.service.CTGetMultiOrders_Static(i.OrderNumber)
//       .subscribe((cat: any) => {
//         (this.MultiOrders = cat);
//         this.getStore();
//         this.spinner.hide();
//       },
//         (err) => {
//           console.log(err);
//           this.spinner.hide();
//         });
//   }
//   this.modalService
//     .open(comments, { ariaLabelledBy: 'modal-basic-title' })
//     .result.then(
//       result => {
//         this.closeResult = `Closed with: ${result}`;
//         this.MultiOrders = '';
//         this.Allocated = false;
//       },
//       reason => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//         this.MultiOrders = '';
//         this.Allocated = false;
//       }
//     );
// }

// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return `with: ${reason}`;
//   }
// }

// getSplitTotals(store: string, sku: string) {
//   if (this.splitTotal.find(s => s.Store === store)) {
//     let i = 0;
//     let stores = 0;
//     for (i = 0, stores = this.splitTotal.length; i < stores; i++) {
//       if (this.splitTotal[i].Store === store) {
//         this.splitTotal[i].Items = +this.splitTotal[i].Items + 1;
//         this.splitTotal[i].SKU = this.splitTotal[i].SKU.concat(', ', sku);
//       }
//     }
//   } else {
//     this.splitTotal.push({
//       Store: store,
//       Items: 1,
//       SKU: sku,
//     });
//   }


// }

// // get the list of registers and SKU numbers
// StoreSplit(store: string, sku: string) {
//   const n = store.indexOf('-') + 2;
//   store = store.substring(n);
//   if (this.tempSplit.find(s => s.SKU === sku)) {
//     let i = 0;
//     let stores = 0;
//     for (i = 0, stores = this.tempSplit.length; i < stores; i++) {
//       if (this.tempSplit[i].SKU === sku) {
//         this.tempSplit[i].Store = store;
//       }
//     }
//     this.splitTotal = [];
//     for (i = 0, stores = this.tempSplit.length; i < stores; i++) {
//       this.getSplitTotals(this.tempSplit[i].Store, this.tempSplit[i].SKU);
//     }
//   } else {
//     this.tempSplit.push({
//       Store: store,
//       SKU: sku,
//     });
//     this.getSplitTotals(store, sku);
//   }
// }

// onProdSelect(args) {
//   if (args.target.value !== '0') {
//     this.StoreSplit(args.target.options[args.target.selectedIndex].text, args.target.value);
//   }
// }

// getCurrent() {
//   this.spinner.show();
//   this.service.CTGetMultiOrders(this.OrderNo)
//     .subscribe((cat: any) => {
//       (this.MultiOrders = cat);
//       this.getStore();
//       this.spinner.hide();
//     },
//       (err) => {
//         console.log(err);
//         this.spinner.hide();
//       });
// }

// openVend() {
//   let VendId: string;
//   console.log(this.OrderNo);
//   this.service.CTGetVendID(this.OrderNo)
//     .subscribe((cat: any) => {
//       (VendId = cat);
//       console.log(VendId, cat);
//       this.spinner.hide();
//       let orderAddress = 'https://thefold.vendhq.com/history#';
//       orderAddress = orderAddress.concat(VendId);
//       window.open(orderAddress, '_blank');
//       //    https://thefold.vendhq.com/history#59423c0f-8e53-b7a4-11ea-94a123b534f8

//     },
//       (err) => {
//         console.log(err);
//         this.spinner.hide();
//       });
// }


// async test(): Promise<void> {
//   this.service.CTGetVendOrder(this.OrderNo)
//   .subscribe(async (cat: any) => {
//     (this.VendMaster = cat);
//     this.VendProducts = this.VendMaster.register_sale_products;
//     let currentRegister: string;
//     let currentProds = [];

//     await Promise.all(this.splitTotal.map(async (file) => {
//       currentRegister = file.Store;
//       currentProds = file.SKU;
//       console.log('New Order', currentRegister, currentProds);
//       const NewOrder = await this.splitOrder2(currentRegister, currentProds);
//       console.log(NewOrder);
//       // let prods = await currentProds.concat(', ', 'FreeStandardShippingPromo');
//       // const products = await this.VendMaster.register_sale_products;
//       // await Promise.all(products.map(async (prod) => {
//       //   console.log(products);
//       //   const substrings = await prods;
//       //   const str = await prod.sku;
//       //   if (new RegExp(substrings.toString()).test(str)) {
//       //      //  console.log('Match using \'' + str + '\'');
//       //      } else {
//       //        console.log('No match using \'' + str + '\'');
//       //        products.splice(0, 1, {
//       //        });
//       //      }
//       // }));
//     }));
//     this.spinner.hide();
//   },
//     (err) => {
//       console.log(err);
//       this.spinner.hide();
//     });
// }

// async splitOrder2(register: string, prods: any): Promise<void> {
//   prods = prods.concat(', ', 'FreeStandardShippingPromo');
//   const products = this.VendMaster.register_sale_products;
//   await Promise.all(products.map(async (prod) => {
//         console.log(products);
//         const substrings = await prods;
//         const str = await prod.sku;
//         if (new RegExp(substrings.toString()).test(str)) {
//            //  console.log('Match using \'' + str + '\'');
//            } else {
//              console.log('No match using \'' + str + '\'');
//              products.splice(0, {
//              });
//            }
//         console.log(register, products);
//       }));
//   console.log(register, products);
//   return products;
// }






// test3() {
//   // Get the current Order
//   // Loop through the Total table
//   // Total table has the products by Store
//   // Grab the firts store
//   // Loop through the Order and remove Products that is not linked to the specific store
//    this.service.CTGetVendOrder(this.OrderNo)
//     .subscribe((cat: any) => {
//       (this.VendMaster = cat);
//       this.VendProducts = this.VendMaster.register_sale_products;
//       let currentRegister: string;
//       let currentProds = [];
//       for (let n = 0; n < this.splitTotal.length; n++) {
//         currentRegister = this.splitTotal[n].Store;
//         currentProds = this.splitTotal[n].SKU;
//         console.log('New Order', currentRegister, currentProds);
//         this.splitOrder(currentRegister, currentProds);
//       }
//       this.spinner.hide();
//     },
//       (err) => {
//         console.log(err);
//         this.spinner.hide();
//       });
// }

// splitOrder(register: string, prods: any) {
//   prods = prods.concat(', ', 'FreeStandardShippingPromo');
//   const products = this.VendMaster.register_sale_products;
//   console.log(products);
//   for (let n = 0; n < products.length; n++) {
//       const substrings = prods.split(', ');
//       const str = products[n].sku;
//       if (new RegExp(substrings.join('|')).test(str)) {
//        //  console.log('Match using \'' + str + '\'');
//        } else {
//          console.log('No match using \'' + str + '\'' + n);
//          products.splice(0, 1, {
//          });
//        }
//    }
//   console.log(register, products);
//   return products;
// }

// test1() {
//   let dd = 0;
//   this.service.CTGetVendOrder(this.OrderNo)
//     .subscribe((cat: any) => {
//       (this.VendMaster = cat);
//       const products = this.VendMaster.register_sale_products;
//       console.log(this.VendMaster.register_sale_products);
//       for (let n = 0; n < products.length; n++) {
//         if (products[n].sku === '38703-L') {
//           products.splice(n, 1, {
//           });
//           dd = n;
//         }
//       }
//     //  delete products[dd];
//       console.log(products);
//       console.log(this.VendMaster);
//       this.spinner.hide();
//     },
//       (err) => {
//         console.log(err);
//         this.spinner.hide();
//       });
// }


// }



























// test1() {
//     this.service.CTGetVendOrder(this.OrderNo)
//       .subscribe((cat: any) => {
//         (this.VendMaster = cat);
//         this.VendProducts = this.VendMaster.register_sale_products;
//         let currentRegister: string;
//         let currentProds = [];
//         for (let n = 0; n < this.splitTotal.length; n++) {
//           currentRegister = this.splitTotal[n]['Store'];
//           currentProds = this.splitTotal[n]['SKU'];
//           console.log('New Order', currentRegister, currentProds);
//           this.splitOrder(currentRegister, currentProds);
//         }

//         this.spinner.hide();
//       },
//         (err) => {
//           console.log(err);
//           this.spinner.hide();
//         });
//   }

//   splitOrder(register: string, prods: any) {
//     const products = this.VendProducts;
//     console.log(this.VendMaster);
//     console.log(products);
//     for (let n = 0; n < products.length; n++) {
//       const substrings = prods.split(', ');
//       for (let i = 0; i < products.length; i++) {
//         const str = products[i].sku;
//         if (new RegExp(substrings.join('|')).test(str)) {
//           console.log('Match using \'' + str + '\'');
//         } else {
//           console.log('No match using \'' + str + '\'');
//           products.splice(i, 1, {
//           });
//         }
//       }
//       console.log(register, products);
//     }
//   }



// test() {
//     this.service.CTGetVendOrder(this.OrderNo)
//       .subscribe((cat: any) => {
//         (this.VendMaster = cat);
//         const products = this.VendMaster.register_sale_products;
//         let currentRegister: string;
//         let currentProds = [];
//         for (let n = 0; n < this.splitTotal.length; n++) {
//           currentRegister = this.splitTotal[n]['Store'];
//           currentProds = this.splitTotal[n]['SKU'];
//           console.log('New Order', currentRegister, currentProds);
//           //     this.splitOrder(currentRegister, currentProds, products);
//           const str = products[n].sku;
//           console.log(str, currentProds);
//           if (new RegExp(currentProds.toString()).test(str)) {
//             console.log('Match using \'' + str + '\'');
//           } else {
//             console.log('No match using \'' + str + '\'');
//             products.splice(n, 1, {
//             });
//           }
//           console.log(currentRegister, products);
//         }




//         console.log(products);
//         console.log(this.VendMaster);
//         this.spinner.hide();
//       },
//         (err) => {
//           console.log(err);
//           this.spinner.hide();
//         });
//   }



//   testx() {
//     let dd = 0;
//     this.service.CTGetVendOrder(this.OrderNo)
//       .subscribe((cat: any) => {
//         (this.VendMaster = cat);
//         const products = this.VendMaster.register_sale_products;
//         console.log(this.VendMaster.register_sale_products);

//         for (let n = 0; n < products.length; n++) {
//           if (products[n].sku === '38703-S') {
//             products.splice(n, 1, {
//             });
//             dd = n;
//           }
//         }
//         delete products[dd];
//         console.log(products);
//         console.log(this.VendMaster);
//         this.spinner.hide();
//       },
//         (err) => {
//           console.log(err);
//           this.spinner.hide();
//         });
//   }
