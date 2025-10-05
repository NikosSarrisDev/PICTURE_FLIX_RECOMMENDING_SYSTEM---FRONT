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
  removeAll = signal(false);

  constructor() { }

  //Κάθε φορά που βάζω καινούργιες τιμές στα από πάνω θα δημιουργήται ένα καινούργιο object και θα γίνεται
  //append σε αυτό το ήδη υπάρχον πίνακα ώστε μετά να μπεί στη βάση
  shopping_cart_items: any = computed(() => {
    if (!this.title() || !this.type() || !this.thumbnail() || !this.quantity() || !this.price()) {
      return [...this.initial_shopping_cart_items];
    }
    if (this.removeAll()) {
      //todo να γίνει το καίνιασμα
      this.removeAll();
    }
    return [...this.initial_shopping_cart_items, { title: this.title(), type: this.type(), thumbnail: this.thumbnail(), quantity: this.quantity(), price: this.price() }];
  })

  //Συνάρτηση για αφαίρεση όλων των στοιχείων από το καλάθι
  //Χρησιμοποιείται απίσης από τη υπηρεσία αυθεντικοποίησης
  //στο logout για λόγους ευκολίας στην διαχείρηση προιόντων
  //ανάμεσα σε διαφορετικούς χρήστες
  removeEverythingFromShoppingCart() {
    this.removeAll.set(true);
  }

}
