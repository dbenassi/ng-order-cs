import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleboardComponent } from './components/articleboard/articleboard.component';
import { OrderComponent } from './components/order/order.component';
import { OrderboardComponent } from './components/orderboard/orderboard/orderboard.component';

const routes: Routes = [
  {path: 'orders', component: OrderboardComponent},
  {path: 'articles', component: ArticleboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
