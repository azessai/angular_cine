import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movies } from '../models/movies';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ca-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movies>;
  currentPage = 1;
  movies: Movies;

  constructor(
    private movieService: MovieService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    // this.httpClient.get(`http://localhost:3000/search?q='Le'&page=10`).
    // pipe(
    //   map(item => item)
    // ).subscribe(console.log);
    this.movies$ = this.movieService.popularMovies(this.currentPage);
//    this.movies$ = this.movieService.searchMovies('Le', this.currentPage);
    this.movies$.subscribe(movies => (this.movies = movies));
//    this.movies$.subscribe(movies => {this.movies = movies; console.log(this.movies.results)});
  }
  clickPredicateName() {}
  clickPredicateRate() {}
}
