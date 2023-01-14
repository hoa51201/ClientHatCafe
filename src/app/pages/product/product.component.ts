import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { DataService } from 'src/app/core/services/data.service';
import {NotificationsService} from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  [x: string]: any;

  constructor(
    private dataService:DataService,
    private route:Router,
    private router: ActivatedRoute,
    private cartService:CartService
  ) { }
  currentSlug=this.router.snapshot.paramMap.get('product_id')
  product_id:any;
  product_image:any;
  product_name:any;
  product_description:any;
  product_prices:any;
  product_quanty:any;
  product_total:any;
  product:any
  itemCart:any;
  item: any;
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.dataService.GET('api/Product/get-item-by-id/'+this.currentSlug).subscribe(
     
      (res:any)=>{
        // console.log('data', this.product_id)
        console.log('data',res)
        this.item=res;
        this.product =res
        this.product_id = res.product_id
        this.product_description = res.product_description
        this.product_image = res.product_image
        this.product_prices = res.product_prices
        this.product_name = res.product_name
      
      }
    )
  }
  changeQuanty(){
    this.product_total = this.product_prices*this.product_quanty
  }
  addToCartInProductDetail(){
    console.log(this.product)
    this.itemCart = {
      id : this.product_id,
      name: this.product_name ,
      quantity: 1,
      prices: this.product_prices,
      total : this.product_total,
      images: this.product_image
    }
    this.cartService.AddToCart(this.itemCart);
  }
  
  
  
}
