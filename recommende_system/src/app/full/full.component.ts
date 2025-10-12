import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthenticationService} from '../auth.service';
import {ShoppingCartSharingService} from './shopping-cart-sharing.service';
import {MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, InputText, FormsModule, MatButton, MatTooltip, MatBadge, RouterLink],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements OnInit {
  title = 'recommended_system';
  router = inject(Router);
  auth = inject(AuthenticationService);
  shoppingShared = inject(ShoppingCartSharingService);

  searchString: string = '';
  currentUser: string = '';
  quantity = 0;

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username;
    console.log(this.currentUser);

    if (this.shoppingShared.shopping_cart_items().length > 0) {
      this.quantity = this.shoppingShared.shopping_cart_items().map((item: any) => item.quantity).reduce((a: any, b: any) => a + b, this.quantity);
    }
  }

  navigateToLoginOrLogout() {
    if (this.currentUser) {
      this.auth.logout();
      window.location.reload();
      return;
    }
    this.router.navigate(['login']);
  }

  protected readonly window = window;
}
