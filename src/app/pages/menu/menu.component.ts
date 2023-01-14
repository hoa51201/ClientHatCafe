import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from 'src/app/core/services/cart.service';
import { DataService } from 'src/app/core/services/data.service';
import { MessageConstants } from 'src/app/core/common/Messages'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  
})
export class MenuComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private cartService:CartService,
    private route: ActivatedRoute
  ) { }
  numberPages: number = 1;
  collection: any[] = [];
  itemCart: any;



  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // console.log(params);
      let category_id = params['category_id']
      //hiển thị kèm có phân trang....
      if(category_id) {
        this.getData2(category_id)
      } else {
        this.getData()
      }
      // let product_name= params['product_name']
      // this.getData3(product_name)

    });
  }
  getData(){
    return this.dataService.GET('api/Product/get-item').subscribe(
      (res:any)=>{
      this.collection = res
      console.log(this.collection);
    })
  }
  getData2(category_id: any){
    return this.dataService.GET(`api/Product/get-item-by-cateid/${category_id}`).subscribe(
      (res:any)=>{
      this.collection = res
      console.log(this.collection);
    })
  }
  getData3(product_name: any){
    return this.dataService.GET(`api/Product/search_product/${product_name}`).subscribe(
      (res:any)=>{
      this.collection = res
      console.log(this.collection);
    })
  }
  search(product_name){
    this.getData3(product_name)
  }
  handlePageChange(event) {
    this.numberPages = event;
  }
//  search(product_name:any){
//     this.dataService.GET(`api/Product/search_product/${product_name}`).subscribe(
//       (res:any)=>{
//         //this.close()
//         this.getData3(res)
//     })
    
//   }
  addToCart(item:any){
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
