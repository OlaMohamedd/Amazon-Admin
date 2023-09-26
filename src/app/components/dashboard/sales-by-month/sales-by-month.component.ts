import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderSevicesService } from 'src/app/Services/orderSevices/order-sevices.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent implements OnInit {

  orders: Order[] = [];
  chart: any; // Reference to the chart object
  orderCounts: number[] = [];

  constructor(private orderService: OrderSevicesService) {}

  ngOnInit(): void {
    this.orderService.getAllProducts().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders);
        this.orderCounts = this.orders.map(
          (p) =>
            this.orders.filter((o) => o._id === p._id).length
        );
        // Create the chart
        this.chart = new Chart('OrderChart', {
          type: 'bar',
          options: {
            animation: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          },
          data: {
            labels: this.orders.map((order) => order._id),
            datasets: [
              {
                data: this.orderCounts,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }

  
}
