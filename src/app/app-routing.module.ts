import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';

const routes: Routes = [  
//   {
//   // path: 'index',
//   // loadChildren: () => import('./pages/index/index.module').then(m => m.IndexComponent)
// },
  {
  path:"",
  component : IndexComponent,
  },
  {
    path:"index",
    component : IndexComponent,
  },
  {
    path:"menu",
    component : MenuComponent,
  },
  {
    path:"product/:product_slug/:id",
    component : ProductComponent,
  },
  {
    path:"product/:product_id",
    component : ProductComponent,
  },
  {
    path:"product/:product_slug",
    component : ProductComponent,
  },
  {
    path:"cart",
    component : CartComponent,
  },{
    path:"checkout",
    component : CheckoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
