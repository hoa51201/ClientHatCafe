import { Injectable } from '@angular/core';
import {NotificationsService} from './notifications.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private notification:NotificationsService,
  ) { }
  CartJSONDatas:any = [
  ]
  ok:any = true;
  CheckCart(){
    return JSON.parse(localStorage.getItem('cart-items'));
  }
  GetCart (){
    return this.CartJSONDatas = JSON.parse(localStorage.getItem('cart-items'));
  }
  GetTotal(){
    
  }
  editCart(product, index) {
    this.GetCart();
    this.CartJSONDatas[index] = product;
    localStorage.setItem("cart-items", JSON.stringify(this.CartJSONDatas));
  }
  removeProductInCart(index: number) {
    this.GetCart();
    this.CartJSONDatas.splice(index, 1);
    localStorage.setItem("cart-items", JSON.stringify(this.CartJSONDatas));
    this.notification.alertSuccessMS("thông báo",'Bạn đã xóa thành công .')

  }
  removeCart() {
    localStorage.removeItem("cart-items");

  }
  AddToCart(data:any){
    if(this.CheckCart()==null){
      this.CartJSONDatas.push(data);
      console.log(this.CartJSONDatas);
      localStorage.setItem("cart-items", JSON.stringify(this.CartJSONDatas));
      this.notification.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
      console.log("Hay quá")
    }
    else{ 
      this.GetCart();
      console.log(this.CartJSONDatas)
      console.log(data.id)
      this.ok = true;
      for (let index = 0; index <  this.CartJSONDatas.length; index++) {
        if(this.CartJSONDatas[index].id === data.id){
          console.log("trùng");
          this.CartJSONDatas[index].quantity+=data.quantity;
          this.CartJSONDatas[index].total = this.CartJSONDatas[index].quantity*this.CartJSONDatas[index].prices
          localStorage.setItem("cart-items", JSON.stringify(this.CartJSONDatas));
          this.ok = false;
          console.log(this.CartJSONDatas[index])
          break;
        }
      }
      if(this.ok){
        this.CartJSONDatas.push(data)
        console.log(this.CartJSONDatas)
        localStorage.setItem("cart-items", JSON.stringify(this.CartJSONDatas));
      }
      //this.notification.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
      console.log("Hay quá")
    }
  }
  ShowCart(){
    
  }
}
