import { Component, OnInit, NgModule } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movies } from '../models/movies';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MovieListModule } from '../movie-list/movie-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'ca-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage: number;
  query: string;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.currentPage = 1;
    const newMovies = new Movies({page: 0, total_results: 0, total_pages: 0, results: []});
    this.movies = newMovies;
    this.moviesLoad();

    this.activatedRoute.params.subscribe(
      params => {
        this.query = params.query;
        this.currentPage = 1;
        this.moviesLoad();
      });
  }
  moviesLoad() {
    this.movies$ = this.movieService.searchMovies(this.query, this.currentPage);
    //    this.movies$.subscribe(movies => (this.movies = movies));
    this.movies$.subscribe(movies => { this.movies = movies; this.currentPage = movies.page; });
  }

  precedent() {
    console.log(this.currentPage);
    this.currentPage -= 1;
    if (this.currentPage >= 1 && this.currentPage <= this.movies.total_pages) {
      this.moviesLoad();
    }
  }
  suivant() {
    console.log(this.currentPage);
    this.currentPage += 1;
    if (this.currentPage >= 1 && this.currentPage <= this.movies.total_pages) {
      this.moviesLoad();
    }
  }
  research(page: number) {
    // this.currentPage = page;
  }
}

@NgModule({
  declarations: [
    MovieSearchComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MovieListModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    MovieSearchComponent
  ]
})
export class MovieSearchModule { }
