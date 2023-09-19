import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderSevicesService } from 'src/services/orderSevices/order-sevices.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
  public details: Order | null = null;
  public totalPrice: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderSevicesService){}

  ngOnInit(): void {
    this.orderService.getPrdByID(this.activatedRoute.snapshot.params['id']).subscribe((res:{data:Order})=>{
      console.log(res);
      this.details = res.data;
      this.details.products.forEach(product=>{
        this.totalPrice += product?.price?.new;
      });
    })
  }
}
