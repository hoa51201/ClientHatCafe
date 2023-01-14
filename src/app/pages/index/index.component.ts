import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/core/services/data.service';
import { CartService } from 'src/app/core/services/cart.service';
import {NotificationsService} from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private cartService:CartService,
    private notification:NotificationsService,
  ) { }
  numberPages: number = 1;
  collection: any[] = [];
  itemCart: any;
  ngOnInit(): void {
    this.getData();
    console.log(this.cartService.CheckCart());
  }
  getData(){
    return this.dataService.GET('api/Product/get-item').subscribe(
      (res:any)=>{
      this.collection = res
      console.log(this.collection);
    })
  }
  handlePageChange(event) {
    this.numberPages = event;
  }
  addToCart(item:any){
    this.notification.alertSuccessMS("thông báo",'Bạn đã thêm thành công .')
    console.log("Hay quá các bạn");
    this.itemCart = {
      id : item.product_id,
      name: item.product_name,
      quantity: 1,
      prices: item.product_prices,
      total : item.product_prices,
      images: item.product_image
    }

    this.cartService.AddToCart(this.itemCart);
    
  }
}
