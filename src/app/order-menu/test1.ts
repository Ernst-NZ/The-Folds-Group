test1() {
    this.service.CTGetVendOrder(this.OrderNo)
      .subscribe((cat: any) => {
        (this.VendMaster = cat);
        this.VendProducts = this.VendMaster.register_sale_products;
        let currentRegister: string;
        let currentProds = [];
        for (let n = 0; n < this.splitTotal.length; n++) {
          currentRegister = this.splitTotal[n]['Store'];
          currentProds = this.splitTotal[n]['SKU'];
          console.log('New Order', currentRegister, currentProds);
          this.splitOrder(currentRegister, currentProds);
        }

        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }

  splitOrder(register: string, prods: any) {
    const products = this.VendProducts;
    console.log(this.VendMaster);
    console.log(products);
    for (let n = 0; n < products.length; n++) {
      const substrings = prods.split(', ');
      for (let i = 0; i < products.length; i++) {
        const str = products[i].sku;
        if (new RegExp(substrings.join('|')).test(str)) {
          console.log('Match using \'' + str + '\'');
        } else {
          console.log('No match using \'' + str + '\'');
          products.splice(i, 1, {
          });
        }
      }
      console.log(register, products);
    }
  }



test() {
    this.service.CTGetVendOrder(this.OrderNo)
      .subscribe((cat: any) => {
        (this.VendMaster = cat);
        const products = this.VendMaster.register_sale_products;
        let currentRegister: string;
        let currentProds = [];
        for (let n = 0; n < this.splitTotal.length; n++) {
          currentRegister = this.splitTotal[n]['Store'];
          currentProds = this.splitTotal[n]['SKU'];
          console.log('New Order', currentRegister, currentProds);
          //     this.splitOrder(currentRegister, currentProds, products);
          const str = products[n].sku;
          console.log(str, currentProds);
          if (new RegExp(currentProds.toString()).test(str)) {
            console.log('Match using \'' + str + '\'');
          } else {
            console.log('No match using \'' + str + '\'');
            products.splice(n, 1, {
            });
          }
          console.log(currentRegister, products);
        }




        console.log(products);
        console.log(this.VendMaster);
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }



  testx() {
    let dd = 0;
    this.service.CTGetVendOrder(this.OrderNo)
      .subscribe((cat: any) => {
        (this.VendMaster = cat);
        const products = this.VendMaster.register_sale_products;
        console.log(this.VendMaster.register_sale_products);

        for (let n = 0; n < products.length; n++) {
          if (products[n].sku === '38703-S') {
            products.splice(n, 1, {
            });
            dd = n;
          }
        }
        delete products[dd];
        console.log(products);
        console.log(this.VendMaster);
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
  }
