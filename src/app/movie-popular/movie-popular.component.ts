import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'ca-movie-popular',
  templateUrl: './movie-popular.component.html',
  styleUrls: ['./movie-popular.component.scss']
})
export class MoviePopularComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage: number;
  constructor( private movieService: MovieService) {}

  ngOnInit() {
    this.currentPage = 1;
    this.movies = new Movies({page: 0, total_results: 0, total_pages: 0, results: []});
    this.moviesLoad();
  }
  private moviesLoad() {
    // console.log(this.currentPage);
    this.movies$ = this.movieService.popularMovies(this.currentPage);
    //    this.movies$ = this.movieService.searchMovies('Le', this.currentPage);
    //    this.movies$.subscribe(movies => (this.movies = movies));
    this.movies$.subscribe(movies => { this.movies = movies; });
  }

  precedent() {
    this.currentPage -= 1;
    if (this.currentPage >= 1 && this.currentPage <= this.movies.total_pages) {
      this.moviesLoad();
    }
  }
  suivant() {
    this.currentPage += 1;
    if (this.currentPage >= 1 && this.currentPage <= this.movies.total_pages) {
      this.moviesLoad();
    }
  }
}