import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any[];
  constructor(private route:Router ,private productSevices: ProductsService) { }

  ngOnInit(): void {
    this.productSevices.getAllProducts().subscribe(
      data=>{
        this.products=[...Object.values(data)][0];
        console.log(this.products);
        
      }
    )
  }

}
