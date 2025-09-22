import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './navbar/home/home.component';
import {MoviesComponent} from './navbar/movies/movies.component';
import {BooksComponent} from './navbar/books/books.component';
import {MusicComponent} from './navbar/music/music.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: NavbarComponent,
        children: [
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'movies',
            component: MoviesComponent
          },
          {
            path: 'books',
            component: BooksComponent
          },
          {
            path: 'music',
            component: MusicComponent
          }
        ]
      }
    ]
  },
];
