import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthenticationService} from '../auth.service';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, InputText, FormsModule, MatButton, MatTooltip],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements OnInit {
  title = 'recommended_system';
  router = inject(Router);
  auth = inject(AuthenticationService);

  searchString: string = '';
  currentUser: string = '';

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username;
    console.log(this.currentUser);
  }

  navigateToLoginOrLogout(){
    if(this.currentUser){
      this.auth.logout();
      window.location.reload();
      return;
    }
    this.router.navigate(['login']);
  }

  protected readonly window = window;
}
