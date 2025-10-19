import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../../auth.service';
import {NgForOf, NgIf, NgFor} from '@angular/common';
import {DataService} from '../../data.service';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    Rating,
    FormsModule,
    ProgressSpinner,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  currentUser: string = "";
  movies: any[] = [];
  books: any[] = [];
  music: any[] = [];
  moviesLoading = false;
  booksLoading = false;
  musicLoading = false;


  auth = inject(AuthenticationService);
  data = inject(DataService);
  router  = inject(Router);

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username;

    this.getAllMovies({username: this.currentUser ? this.currentUser : "Guest"});
    this.getAllBooks({username: this.currentUser ? this.currentUser : "Guest"});
    this.getAllMusic({username: this.currentUser ? this.currentUser : "Guest"});
  }

  getAllMovies(data: any) {
    this.moviesLoading = true;

    this.data.getRecommendedMovie(data).subscribe((movies: any) => {
      this.movies = movies;
      this.moviesLoading = false;
    });
  }

  getAllBooks(data: any) {
    this.booksLoading = true;

    this.data.getRecommendedBook(data).subscribe((books: any) => {
      this.books = books;
      this.booksLoading = false;
    })
  }

  getAllMusic(data: any){
    this.musicLoading = true;

    this.data.getRecommendedMusic(data).subscribe((musics: any) => {
      this.music = musics;
      this.musicLoading = false;
    })
  }

  moveToMovieOverview(title: string, thumbnail: string, type: string) {
    this.router.navigate(["/movieOverview"], { queryParams: { title: title, thumbnail: thumbnail, type: type, price: 10 }});
  }
}
