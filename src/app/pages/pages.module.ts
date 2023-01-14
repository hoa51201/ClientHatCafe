import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
 import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    CartComponent,
   CheckoutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    // NgxPaginationModule 
  ]
})
export class PagesModule { }
