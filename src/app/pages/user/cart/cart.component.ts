import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart :any[] = [];
  total_price: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.GetCart();
    console.log(this.cart)
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total_price = this.cart.reduce((pre, current) => {
      console.log(current)
      return pre + current.prices * current.quantity
    }, 0)
  }

  deleteProduct(index: number) {
    this.cartService.removeProductInCart(index);
    this.cart.splice(index, 1);
    this.getTotalPrice();
  }

  editCart(product: any, index:number) {
    this.cartService.editCart(product, index);
    this.getTotalPrice();
  }

}
