import { Component } from '@angular/core';
import { Order } from './../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
   orders: Order[] ;
   constructor(){
    this.orders=[]
   }



}
