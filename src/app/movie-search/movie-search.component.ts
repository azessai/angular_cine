import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movies } from '../models/movies';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'ca-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage = 1;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.movies$ = this.activatedRoute.paramMap
    .pipe(
      map(paramMap => paramMap.get('query')),
      switchMap(query => this.movieService.searchMovies(query, this.currentPage)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
//    this.movies$.subscribe(movies => (this.movies = movies));
    this.movies$.subscribe(movies => {this.movies = movies; console.log(this.movies.results); });
  }

}
