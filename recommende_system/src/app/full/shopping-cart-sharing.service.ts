import {computed, Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartSharingService {

  title = signal("");
  type = signal("");
  thumbnail = signal("");
  quantity = signal(0);
  price = signal(0);
  initial_shopping_cart_items = []

  constructor() { }

  //Κάθε φορά που βάζω καινούργιες τιμές στα από πάνω θα δημιουργήται ένα καινούργιο object και θα γίνεται
  //append σε αυτό το ήδη υπάρχον πίνακα ώστε μετά να μπεί στη βάση
  shopping_cart_items = computed(() => {
    if (!this.title() || !this.type() || !this.thumbnail() || !this.quantity() || !this.price()) {
      return [...this.initial_shopping_cart_items];
    }
    return [...this.initial_shopping_cart_items, { title: this.title(), type: this.type(), thumbnail: this.thumbnail(), quantity: this.quantity(), price: this.price() }];
  })

}
