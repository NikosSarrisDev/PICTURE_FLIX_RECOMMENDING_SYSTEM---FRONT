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

  shopping_cart_items: any[] = [];
  total_cost: number = 0;
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

    if (this.shopping_cart_items.length > 0) {
      this.total_cost = this.shopping_cart_items.map((item: any) => item.quantity).reduce((a, b) => a + b, 0) * 10;
    }
  }

  removeItemFromShoppingCart(index: number){
    this.shoppingCartShared.removeOne(index);
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
