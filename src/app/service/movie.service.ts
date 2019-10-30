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

  private url = 'https://api.themoviedb.org/3/movie/';
  private urlDiscover = 'https://api.themoviedb.org/3/discover/movie';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '68b4fe2a513155a58dd0af4adacb281b';
  private language = 'fr-FR';

  constructor(private httpClient: HttpClient) { }



  popularMovies(page: number): Observable<Movies> {
    let localUrl = `${this.url}popular?api_key=${this.apiKey}&language=${this.language}`;
    localUrl += `&page=${page}&include_adult=false`;
    return this.httpClient.get<ApiMovies>(localUrl).
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

  popularDiscoverMovies(page: number, sort = 'asc'): Observable<Movies> {
    let localUrl = `${this.urlDiscover}?api_key=${this.apiKey}&language=${this.language}`;
    localUrl += `&page=${page}&include_adult=false&sort_by=popularity.${sort}&year=2019`;
    return this.httpClient.get<ApiMovies>(localUrl).
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

  getMovieInfo(id: string): Observable<Movie> {
    return this.httpClient.get<ApiMovie>(`${this.url}${id}?api_key=${this.apiKey}&language=${this.language}`).
    pipe(
      map(movie => new Movie(movie)),
      retry(3),
      catchError(err => {
        console.warn(err);
        return EMPTY;
      })
    );
  }

  searchMovies(query: string, page: number): Observable<Movies> {
    const localUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}\
    &query=${query}&page=${page}&include_adult=false`;
    return this.httpClient.get<ApiMovies>(localUrl).

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


  listGenre(): Observable<any> {
    return this.httpClient.get<any>(`http://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`);
  }



}
