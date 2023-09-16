import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';
import { OrderSevicesService } from './../../../services/orderSevices/order-sevices.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
   orders: any =[] ;
   constructor(    private orderSevicesService: OrderSevicesService    ){
    
    
   }
  ngOnInit(): void {
    this.orderSevicesService.getAllProducts().subscribe(
      data =>{
        // console.log(data);

        this.orders=[...Object.values(data)][0];
        console.log(this.orders);
        
      }
    );
  }
   


}
