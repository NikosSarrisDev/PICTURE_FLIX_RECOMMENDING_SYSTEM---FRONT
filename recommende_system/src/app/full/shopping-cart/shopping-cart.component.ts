import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
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
    ProgressSpinner,
    NgStyle
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
  messageService = inject(MessageService);

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username
    this.shopping_cart_items = this.shoppingCartShared.shopping_cart_items();

    if (this.shopping_cart_items.length > 0) {
      this.findTotalCost();
    }
  }

  removeItemFromShoppingCart(index: number){
    this.shoppingCartShared.removeOne(index);
    this.findTotalCost();
  }

  storeOrder() {
    this.orderSend = true;
    this.dataService.storeOrder({ username: this.currentUser ?? "guest", orderDetails: this.shopping_cart_items }).subscribe(response => {

      this.messageService.add({ severity: response.status, summary: 'Επιτυχία', detail: 'Η αγορά ολοκληρώθηκε!' });

      //Μετά από επιτυμένη αγορά αδιάζουμε το καλάθι
      this.removeAllFromCart();
      this.orderSend = false;
    })
  }

  removeAllFromCart() {
    this.shopping_cart_items = [];
    this.shoppingCartShared.removeEverythingFromShoppingCart();
  }

  findTotalCost() {
    this.total_cost = this.shoppingCartShared.shopping_cart_items().map((item: any) => item.quantity).reduce((a : any, b : any) => a + b, 0) * 10;
  }

}
