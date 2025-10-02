import {Component, inject, OnInit} from '@angular/core';
import {Checkbox} from 'primeng/checkbox';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AuthenticationService} from '../../auth.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {MatPaginator} from '@angular/material/paginator';
import {Paginator} from 'primeng/paginator';

@Component({
  selector: 'app-music',
  standalone: true,
    imports: [
        Checkbox,
        InputText,
        NgForOf,
        NgIf,
        Paginator,
        ProgressSpinner,
        ReactiveFormsModule
    ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {

  filtersForm!: FormGroup;
  movies: any[] = [];
  paginatedMovies: any[] = [];
  first: number = 0;
  rows: number = 9;
  loading!: boolean;

  private router = inject(Router);
  private dataService = inject(DataService);
  private formBuilder = inject(FormBuilder);
  private auth = inject(AuthenticationService);

  ngOnInit() {
    this.getMovies({});

    this.filtersForm = this.formBuilder.group({
      "title": [''],
      "action": [false],
      "adventure": [false],
      "children": [false],
      "comedy": [false],
      "crime": [false],
      "drama": [false],
      "fantasy": [false],
      "horror": [false],
      "musical": [false],
      "mystery": [false],
      "romance": [false],
      "scifi": [false],
      "thriller": [false],
      "war": [false]
    })
  }

  getMovies(data: any) {
    this.loading = true;
    this.dataService.musicMovies(data).subscribe((response) => {
      this.movies = response;
      this.updatePaginatedMovies();
      this.loading = false;
    })
  }

  //ugly code it was not to be that way :)
  applyFilters() {

    const title = this.filtersForm.get('title')?.value;

    let type: string[] = [];
    if (this.filtersForm.get('action')?.value) {
      type.push('Action');
    }
    if (this.filtersForm.get('adventure')?.value) {
      type.push('Adventure');
    }
    if (this.filtersForm.get('children')?.value) {
      type.push('Children');
    }
    if (this.filtersForm.get('comedy')?.value) {
      type.push('Comedy');
    }
    if (this.filtersForm.get('crime')?.value) {
      type.push('Crime');
    }
    if (this.filtersForm.get('drama')?.value) {
      type.push('Drama');
    }
    if (this.filtersForm.get('fantasy')?.value) {
      type.push('Fantasy');
    }
    if (this.filtersForm.get('horror')?.value) {
      type.push('Horror');
    }
    if (this.filtersForm.get('musical')?.value) {
      type.push('Musical');
    }
    if (this.filtersForm.get('mystery')?.value) {
      type.push('Mystery');
    }
    if (this.filtersForm.get('romance')?.value) {
      type.push('Romance');
    }
    if (this.filtersForm.get('scifi')?.value) {
      type.push('Sci-Fi');
    }
    if (this.filtersForm.get('thriller')?.value) {
      type.push('Thriller');
    }
    if (this.filtersForm.get('war')?.value) {
      type.push('War');
    }

    this.getMovies({ title: title, type: type.join("|")});
  }

  onPageChange(event: any){
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedMovies();
  }

  updatePaginatedMovies() {
    const start = this.first;
    const end = this.first + this.rows;
    console.log(start, end);
    this.paginatedMovies = this.movies.slice(start, end);
  }

  moveToMovieOverview(title: string, thumbnail: string, type: string) {
    this.router.navigate(["/movieOverview"], { queryParams: { title: title, thumbnail: thumbnail, type: type, price: 10 }});
  }

  resetFilters() {
    this.filtersForm.reset();
    this.getMovies({});
  }

}
