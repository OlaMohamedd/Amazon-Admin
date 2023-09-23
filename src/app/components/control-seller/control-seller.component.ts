import { Component, OnInit } from '@angular/core';
import { ControlSellerService } from 'src/app/Services/Control-Service/control-seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-seller',
  templateUrl: './control-seller.component.html',
  styleUrls: ['./control-seller.component.scss']
})
export class ControlSellerComponent implements OnInit {
  sellers: any=[];

  constructor(private sellerService: ControlSellerService) { }

  ngOnInit() {
    this.loadSellers();
  }

  loadSellers() {
    this.sellerService.getAllSellers().subscribe(
      // next:(response) => {
      //   this.sellers = [...Object.values(response.data)][0];
      // },
      // error:(error) => {
      //   console.log(error);
      // }
      data =>{
  
        this.sellers=[...Object.values(data)][0];
              // console.log(this.orders);

      }
  );
  }

//   deleteSeller(sellerId: string) {

//     this.sellerService.deleteSeller(sellerId).subscribe({
//       next:(response) => {
//         console.log(response);
//         const index = this.sellers.findIndex(seller => seller._id === sellerId);
//         if (index !== -1) {
//           this.sellers[index].status = 'deleted';
//           Swal.fire({title:'Update statue!',text:"Seller deleted", icon:'success'});
//         }
//       },
//       error:(error) => {
//         console.log(error);
//       }
//     });
// }
deleteSeller(sellerId: string) {
  Swal.fire({
    title: 'Delete order!',
    text: 'Do you want to delete order',
    icon: 'question',
    confirmButtonText: 'Delete Order',
    cancelButtonText: 'Cancel',
    showCancelButton: true
  }).then((res) =>{
    if(res.isConfirmed){
      this.sellerService.deleteSeller(sellerId).subscribe(res=>{
        console.log(res);
        Swal.fire({title:'Order deleted!',text:"Order deleted", icon:'success'});
        this.loadSellers();
      })
    }
  })
 

}
changeStatus(sellerId: string, status: string) {
  if (status == 'warning') {
    this.sellers.status = 'blocked';
    this.sellerService.changeStatus(sellerId, status).subscribe(
      res=>{
        console.log(res);
        this.loadSellers();
      });
  }
   
  }
}

