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
  currentPage = 1;
  constructor( private movieService: MovieService) {
    console.log(this.currentPage);
   }

  ngOnInit() {
    // this.httpClient.get(`http://localhost:3000/search?q='Le'&page=10`).
    // pipe(
    //   map(item => item)
    // ).subscribe(console.log);

    this.movies$ = this.movieService.popularMovies(this.currentPage);
//    this.movies$ = this.movieService.searchMovies('Le', this.currentPage);
//    this.movies$.subscribe(movies => (this.movies = movies));
    console.log('ccc');
    this.movies$.subscribe(movies => {this.movies = movies; console.log(this.movies.results); });
  }

}
