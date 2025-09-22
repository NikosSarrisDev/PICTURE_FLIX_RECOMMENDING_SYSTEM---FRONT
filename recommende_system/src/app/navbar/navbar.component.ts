import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {HomeComponent} from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {BooksComponent} from './books/books.component';
import {MusicComponent} from './music/music.component';
import {MyProfileComponent} from './my-profile/my-profile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    HomeComponent,
    MoviesComponent,
    BooksComponent,
    MusicComponent,
    MyProfileComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
