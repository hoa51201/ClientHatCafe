import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { CartService } from 'src/app/core/services/cart.service';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';
declare const  Cart:any
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  constructor(
    public dataService:DataService,
    private cartService:CartService,
    private router: Router,
  ) { }
  cart :any[] = [];
  total_price: any = 0;
  ngOnInit(): void {
    this.cart = this.cartService.GetCart();
    this.getTotalPrice();
  }
  getTotalPrice() {
    this.total_price = this.cart.reduce((pre, current) => {
      console.log(current)
      return pre + current.prices * current.quantity
    }, 0)
  }
  submit(){
    var totalCart = 0;
    for (let index = 0; index < this.cartService.GetCart().length; index++) {
       totalCart += this.cartService.GetCart()[index].bill_details_prices*this.cartService.GetCart()[index].bill_details_quantity;
      
    }

    let billDetails = this.cart.map((item: any) => {
      return {
        bill_product_id: item.id,
        bill_product_name: item.name,
        bill_product_prices: item.prices,
        bill_product_quantity: item.quantity,
        bill_product_total: item.total
      }
    })
    
    var data = {
      billDetails: billDetails,
      bill: {
        bill_total: this.total_price,
        customer_name: this.dataService.form.value.name,
        customer_email: this.dataService.form.value.email,
        customer_address: this.dataService.form.value.address,
        customer_phone_number: this.dataService.form.value.phone ,
        bills_sale_day: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
        bill_pay_day: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      }
    }
    console.log(data);
    this.dataService.POST('api/Bill/checkout',data).subscribe(
      (res:any)=>{
        console.log(res)
        this.cartService.removeCart()
        this.router.navigate([''])
    },(error:any)=>{
      console.log(error)
    }
      
    )
  }
}
