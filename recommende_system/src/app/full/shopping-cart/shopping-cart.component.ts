import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {DataService} from '../../data.service';
import {AuthenticationService} from '../../auth.service';
import {Toast, ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    Toast,
    ProgressSpinner
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {

  shopping_cart_items: {
    title: string
    type: string
    thumbnail: string
    quantity: number
    price: number
  }[] = [];
  total_cost!: number;
  currentUser!: string;
  orderSend: boolean = false;

  shoppingCartShared = inject(ShoppingCartSharingService);
  dataService = inject(DataService);
  auth = inject(AuthenticationService);
  router = inject(Router);
  messageService = inject(MessageService)

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username
    this.shopping_cart_items = this.shoppingCartShared.shopping_cart_items();
    this.total_cost = this.shopping_cart_items.map((item: any) => item.price).reduce((a, b) => a + b, 0);
    console.log(this.total_cost);
  }

  removeItemFromShoppingCart(index: number){

  }

  storeOrder() {
    this.orderSend = false;
    this.dataService.storeOrder({ username: this.currentUser ?? "guest", orderDetails: this.shopping_cart_items }).subscribe(response => {
      console.log(response);
      if (response && response.status === "error") {
        this.messageService.add({ severity: response.status, summary: 'Επιτυχία', detail: 'Η αγορά ολοκληρώθηκε!' });
      }

      //Μετά από επιτυμένη αγορά αδιάζουμε το καλάθι
      this.removeAllFromCart();
      this.orderSend = true;
      this.router.navigate([""]);
    })
  }

  removeAllFromCart() {
    this.shopping_cart_items = [];
    this.shoppingCartShared.removeEverythingFromShoppingCart();
  }

}
