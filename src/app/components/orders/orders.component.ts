import { Component, OnInit } from '@angular/core';
import { OrderSevicesService } from './../../../services/orderSevices/order-sevices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
   orders: any =[] ;
   constructor(    private orderSevicesService: OrderSevicesService,    private router: Router,    ){}
  ngOnInit(): void {
    this.orderSevicesService.getAllProducts().subscribe(
      data =>{
        // console.log(data);

        this.orders=[...Object.values(data)][0];
        
      }
    );
  }
  details(id:string){
      //////////////////////make details component
      this.router.navigate(['/orders/orderdetails',id]);

  }
  totalprice(t:any[]){
    let sum =0
    for (let i of t ){
      sum+=i.price.new;
      
  }
  return sum
}
   


}
