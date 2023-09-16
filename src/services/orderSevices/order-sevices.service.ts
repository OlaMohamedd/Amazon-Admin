import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './../../app/models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderSevicesService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts():Observable<Order[]>{
    
     return this.httpClient.get<Order[]>('http://localhost:3300/order');
    //  return this.httpClient.get<Iproduct[]>(`${environment.BaseApiURL}/products`);
    }
  getPrdByID(orderID:number):Observable<Order>{
    // return this.httpClient.get<Iproduct>('http://localhost:3000/products'+'/'+prdID);
    return this.httpClient.get<Order>(`http://localhost:3300/order/${orderID}`);
  }
}
