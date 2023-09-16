import { Component } from '@angular/core';
import { Order } from './../../models/order';
import { OrderSevicesService } from './../../../services/orderSevices/order-sevices.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
   orders: Order[]=[] ;
   constructor(    private orderSevicesService: OrderSevicesService    ){
    this.orderSevicesService.getAllProducts().subscribe(
      data =>{
        // console.log(data);

        this.orders=data;
        console.log(this.orders);
        
      }
    );
   }



}
