import {Component, inject, signal, input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';
import {Toast, ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-overview',
  standalone: true,
  imports: [
    RouterLink,
    Toast
  ],
  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.css',
  providers: [MessageService]
})
export class MovieOverviewComponent implements OnInit {

  title = input("");
  thumbnail = input("");
  type = input("");
  price = input(0);
  quantity = 1;

  router = inject(Router);
  shoppingShared = inject(ShoppingCartSharingService);
  messageService = inject(MessageService)

  ngOnInit() {
    //Fill with recommended movies
  }

  addToShoppingCart() {

    this.shoppingShared.title.set(this.title());
    this.shoppingShared.thumbnail.set(this.thumbnail());
    this.shoppingShared.type.set(this.type());
    this.shoppingShared.price.set(this.price());
    this.shoppingShared.quantity.set(this.quantity);

    this.messageService.add({ severity: 'success', summary: 'Επιτυχία', detail: 'Το αντικείμενο προσθέθηκε στο καλάθι αγορών' });
  }

  addQuantity() {
    this.quantity++
  }

  lowerQuantity() {
    this.quantity--;
  }

}
