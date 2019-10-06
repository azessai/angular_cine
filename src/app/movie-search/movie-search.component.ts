import { Component, OnInit, Injectable } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movies } from '../models/movies';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ca-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage: number;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.currentPage = 1;
    console.log('init: ' + this.currentPage);
    const newMovies = new Movies({page: 0, total_results: 0, total_pages: 0, results: []});
    this.movies = newMovies;
    this.moviesLoad();
  }
  private moviesLoad() {
    this.movies$ = this.activatedRoute.paramMap
      .pipe(map(paramMap => paramMap.get('query')),
      switchMap(query => this.movieService.searchMovies(query, this.currentPage)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      }));
    //    this.movies$.subscribe(movies => (this.movies = movies));
    this.movies$.subscribe(movies => { this.movies = movies; });
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
}
