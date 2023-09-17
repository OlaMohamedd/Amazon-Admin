import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderSevicesService } from 'src/services/orderSevices/order-sevices.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  order :any={}
  id:string=""
  
  constructor(    private orderSevicesService: OrderSevicesService,private activatedRoute:ActivatedRoute,    private router: Router,    ){}
  
  ngOnInit() : void {
    this.id=(this.activatedRoute.snapshot.paramMap.get("id"))?String(this.activatedRoute.snapshot.paramMap.get("id")):""

    this.orderSevicesService.getPrdByID(this.id).subscribe(
      data =>{


        this.order=[...Object.values(data)][0];
                // console.log(this.order);

      }
    );
  }
  totalprice(t:any[]){
    // console.log(t);
    
    let sum =0
    for (let i of t ){
      sum+=i.price.new;
      
  }
  return sum
}
complete(){}
process(){}
}
