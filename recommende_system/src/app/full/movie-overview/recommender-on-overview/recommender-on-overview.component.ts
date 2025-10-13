import {Component, effect, inject, input, OnInit, signal} from '@angular/core';
import {AuthenticationService} from '../../../auth.service';
import {DataService} from '../../../data.service';
import {NgForOf, NgIf} from '@angular/common';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-recommender-on-overview',
  standalone: true,
  imports: [
    NgForOf,
    Rating,
    FormsModule,
    ProgressSpinner,
    NgIf
  ],
  templateUrl: './recommender-on-overview.component.html',
  styleUrl: './recommender-on-overview.component.css'
})
export class RecommenderOnOverviewComponent implements OnInit {

  type = input();
  loading!: boolean;
  movies: any[] = [];

  auth = inject(AuthenticationService);
  data = inject(DataService);
  router = inject(Router);

  ngOnInit() {
    this.getAllMovies();
  }

  moveToMovieOverview(title: string, thumbnail: string, type: string) {
    this.router.navigate(["/movieOverview"], {
      queryParams: {
        title: title,
        thumbnail: thumbnail,
        type: type,
        price: 10
      }
    });
  }

  getAllMovies() {
    this.loading = true;

    this.data.getRecommendedMovieInOverview({type: this.type(), limit: 10}).subscribe((movies: any) => {
      this.movies = movies;
      this.loading = false;
    });
  }

}
