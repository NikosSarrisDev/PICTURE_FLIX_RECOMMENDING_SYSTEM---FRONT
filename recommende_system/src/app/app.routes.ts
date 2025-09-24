import { Routes } from '@angular/router';
import {HomeComponent} from './navbar/home/home.component';
import {MoviesComponent} from './navbar/movies/movies.component';
import {BooksComponent} from './navbar/books/books.component';
import {MyProfileComponent} from './navbar/my-profile/my-profile.component';
import {MusicComponent} from './navbar/music/music.component';
import {FullComponent} from './full/full.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'music',
        component: MusicComponent,
      },
      {
        path: 'myProfile',
        component: MyProfileComponent,
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rememberPassword',
    component: PasswordRecoveryComponent
  }
];
