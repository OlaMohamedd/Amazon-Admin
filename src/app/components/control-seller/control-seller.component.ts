import { Component, OnInit } from '@angular/core';
import { ControlSellerService } from 'src/app/Services/Control-Service/control-seller.service';

@Component({
  selector: 'app-control-seller',
  templateUrl: './control-seller.component.html',
  styleUrls: ['./control-seller.component.scss']
})
export class ControlSellerComponent implements OnInit {
  sellers: any[];

  constructor(private sellerService: ControlSellerService) { }

  ngOnInit() {
    this.loadSellers();
  }

  loadSellers() {
    this.sellerService.getAllSellers().subscribe({
      next:(response) => {
        this.sellers = response.data;
      },
      error:(error) => {
        console.log(error);
      }
  });
  }

  deleteSeller(sellerId: string) {
    this.sellerService.deleteSeller(sellerId).subscribe({
      next:(response) => {
        console.log(response);
        const index = this.sellers.findIndex(seller => seller._id === sellerId);
        if (index !== -1) {
          this.sellers[index].status = 'deleted';
        }
      },
      error:(error) => {
        console.log(error);
      }
    });
}
changeStatus(sellerId: string,status: string){
   this.sellerService.changeStatus(sellerId,status).subscribe({
    next:(response) => {
      console.log(response);
    //  if(seller.status=='warning'){
    //   seller.status='blocked';
    //  }
    },
    error:(error) => {
    }
  });
}
}
