import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

import { Movie } from '../models/movie';
import { map, retry, catchError } from 'rxjs/operators';
import { Movies } from '../models/movies';

export interface ApiMovie {
  id: number;
  title: string;
}

export interface ApiMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: ApiMovie[];
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }
  getMovieInfo(id: string): Observable<Movie> {
    return this.httpClient.get<ApiMovie>(`http://localhost:3000/info/${id}`).
    pipe(
      map(movie => new Movie(movie)),
      retry(3),
      catchError(err => {
        console.warn(err);
        return EMPTY;
      })
    );
  }
  popularMovies(page: number): Observable<Movies> {
    return this.httpClient.get<ApiMovies>(`http://localhost:3000/popular?page=${page}`).
    pipe(
      map(item => new Movies({
        page: item.page,
        total_results: item.total_results,
        total_pages: item.total_pages,
        results: item.results.map(this.moviesFromApi)
      })),
      retry(3),
      catchError(err => {
        console.warn(err);
        return EMPTY;
      })
    );
  }
  searchMovies(query: string, page: number): Observable<Movies> {
    return this.httpClient.get<ApiMovies>(`http://localhost:3000/search?q=${query}&page=${page}`).
    pipe(
      map(item => new Movies({
        page: item.page,
        total_results: item.total_results,
        total_pages: item.total_pages,
        results: item.results.map(this.moviesFromApi)
      })),
      retry(3),
      catchError(err => {
        console.warn(err);
        return EMPTY;
      })
    );
  }
  moviesFromApi(movie: ApiMovie) {
    return new Movie(movie);
  }
}
