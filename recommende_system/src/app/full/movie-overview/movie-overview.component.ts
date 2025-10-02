import {Component, inject, signal, input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';

@Component({
  selector: 'app-movie-overview',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.css'
})
export class MovieOverviewComponent implements OnInit {

  title = input("");
  thumbnail = input("");
  type = input("");
  price = input(0);
  quantity = 0;

  router = inject(Router);
  shoppingShared = inject(ShoppingCartSharingService);

  ngOnInit() {
    //Fill with recommended movies
  }

  addToShoppingCart() {

    this.shoppingShared.title.set(this.title());
    this.shoppingShared.thumbnail.set(this.thumbnail());
    this.shoppingShared.type.set(this.type());
    this.shoppingShared.price.set(this.price());
    this.shoppingShared.quantity.set(this.quantity);

    this.router.navigate(['']);
  }

  addQuantity() {
    this.quantity++
  }

  lowerQuantity() {
    this.quantity--;
  }

}
