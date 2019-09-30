import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { ApiMovie } from '../service/movie.service';

@Injectable({
  providedIn: 'root'
})
export class Movies {
  page: number;
  // tslint:disable-next-line: variable-name
  total_results: number;
  // tslint:disable-next-line: variable-name
  total_pages: number;
  results: Movie[];

  constructor( args: Partial<Movies> = {}) {
    this.page = args.page;
    this.total_results = args.total_results;
    this.total_pages = args.total_pages;
    this.results = args.results;
  }
}
