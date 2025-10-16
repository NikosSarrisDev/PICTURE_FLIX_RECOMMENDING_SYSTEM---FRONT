import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../../auth.service';
import {DataService} from '../../data.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ProgressSpinner,
    DatePipe
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  username!: string;
  orders: any[] = [];
  loading!: boolean;
  orderItemsArray : any[] = [];
  mockDatetime: Date = new Date("2025-10-11T20:26:45.789Z");

  auth = inject(AuthenticationService);
  data = inject(DataService);

  ngOnInit() {

    // this.username = this.auth.currentUser()?.username;
    this.username = "guest";
    if(this.username){
      this.getAllOrders({username: this.username});
    }

  }

  getAllOrders(data: any) {

    this.loading = true;

    this.data.getOrder(data).subscribe((response: any) => {
      if (response && response.status == "success") {

        for (let order of response.data){
          for (let orderItem of order.orderDetails){
            this.orderItemsArray = [...this.orderItemsArray, orderItem]
          }
        }
        this.orders = this.orderItemsArray;

        this.loading = false;
      }
    })
  }

}
