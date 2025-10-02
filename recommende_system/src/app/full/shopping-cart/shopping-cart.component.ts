import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {DataService} from '../../data.service';
import {AuthenticationService} from '../../auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  shopping_cart_items: {
    title: string
    type: string
    thumbnail: string
    quantity: number
    price: number
  }[] = [];
  total_cost: any;
  currentUser!: string;

  shoppingCartShared = inject(ShoppingCartSharingService);
  dataService = inject(DataService);
  auth = inject(AuthenticationService);
  router = inject(Router);

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username
    this.shopping_cart_items = this.shoppingCartShared.shopping_cart_items();
    this.total_cost = this.shopping_cart_items.map((item: any) => item.price).reduce((a, b) => a + b, 0);
    console.log(this.total_cost);
  }

  removeItemFromShoppingCart(index: number){

  }

  storeOrder() {
    this.dataService.storeOrder({ username: this.currentUser, orderDetails: this.shopping_cart_items }).subscribe(response => {
      this.router.navigate([""]);
    })
  }

}
