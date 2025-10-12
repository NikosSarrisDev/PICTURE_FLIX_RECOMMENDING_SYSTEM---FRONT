import {computed, effect, Injectable, Signal, signal, untracked, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartSharingService {

  title = "";
  type = "";
  thumbnail = "";
  quantity = 0;
  price = 0;
  initial_shopping_cart_items: WritableSignal<any> = signal([]);

  //Κάθε φορά που βάζω καινούργιες τιμές στα από πάνω θα δημιουργήται ένα καινούργιο object και θα γίνεται
  //append σε αυτό το ήδη υπάρχον πίνακα ώστε μετά να μπεί στη βάση
  shopping_cart_items: any = computed(() => {
    return this.initial_shopping_cart_items();
  })

  addToCart(title: string, type: string, thumbnail: string, quantity: number, price: number) {
    this.initial_shopping_cart_items.update(value => [
      ...value,
      { title : title, type: type, thumbnail: thumbnail, quantity: quantity, price: price }
    ]);
  }

  //Συνάρτηση για αφαίρεση όλων των στοιχείων από το καλάθι
  //Χρησιμοποιείται απίσης από τη υπηρεσία αυθεντικοποίησης
  //στο logout για λόγους ευκολίας στην διαχείρηση προιόντων
  //ανάμεσα σε διαφορετικούς χρήστες
  removeEverythingFromShoppingCart() {
    this.initial_shopping_cart_items.set([]);
  }

  removeOne(index: number) {
    this.initial_shopping_cart_items().splice(index, 1);
  }

}
