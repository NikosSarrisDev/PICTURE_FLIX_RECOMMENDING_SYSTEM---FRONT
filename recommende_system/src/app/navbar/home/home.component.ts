import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../../auth.service';
import {NgForOf, NgIf, NgFor} from '@angular/common';
import {DataService} from '../../data.service';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    Rating,
    FormsModule,
    ProgressSpinner
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

  ngOnInit() {
    this.currentUser = this.auth.currentUser()?.username;

    this.getAllMovies();
    this.getAllBooks();
    this.getAllMusic();
  }

  getAllMovies() {
    this.moviesLoading = true;

    this.data.getRecommendedMovie({type : "War", limit: 10}).subscribe((movies: any) => {
      this.movies = movies;
      this.moviesLoading = false;
    });
  }

  getAllBooks() {
    this.booksLoading = true;

    this.data.getRecommendedBook({type : "War", limit: 10}).subscribe((books: any) => {
      this.books = books;
      this.booksLoading = false;
    })
  }

  getAllMusic(){
    this.musicLoading = true;

    this.data.getRecommendedMusic({type : "War", limit: 10}).subscribe((musics: any) => {
      this.music = musics;
      this.musicLoading = false;
    })
  }
}
