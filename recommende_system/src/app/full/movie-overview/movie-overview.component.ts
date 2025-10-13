import {Component, inject, signal, input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ShoppingCartSharingService} from '../shopping-cart-sharing.service';
import {Toast, ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {AuthenticationService} from '../../auth.service';
import {RecommenderOnOverviewComponent} from './recommender-on-overview/recommender-on-overview.component';

@Component({
  selector: 'app-movie-overview',
  standalone: true,
  imports: [
    RouterLink,
    Toast,
    RecommenderOnOverviewComponent
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
  username!: string;

  router = inject(Router);
  shoppingShared = inject(ShoppingCartSharingService);
  messageService = inject(MessageService);
  auth = inject(AuthenticationService);

  ngOnInit() {
    this.username = this.auth.currentUser()?.username ? this.auth.currentUser()?.username : "Επισκέπτη";
  }

  addToShoppingCart() {
    this.shoppingShared.addToCart(this.title(), this.type(), this.thumbnail(), this.quantity, this.price());
    this.messageService.add({ severity: 'success', summary: 'Επιτυχία', detail: 'Το αντικείμενο προσθέθηκε στο καλάθι αγορών' });

    // Χρησιμοποιήται για να μετακινηθώ στο κάτω μέρος της html ώστε
    // ο χρήστης να δει τις προτεινόμενες ταινίες
    const el = document.getElementById("checkpoint");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

  }

  addQuantity() {
    this.quantity++
  }

  lowerQuantity() {
    this.quantity--;
  }

}
