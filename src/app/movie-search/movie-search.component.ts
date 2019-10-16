import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movies } from '../models/movies';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MovieListModule } from '../movie-list/movie-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'ca-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage = 0;
  query: string;

  pageSize = 20;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.currentPage = 0;
    //const newMovies = new Movies({page: 0, total_results: 0, total_pages: 0, results: []});
    //this.movies = newMovies;
    //this.moviesLoad();

    this.activatedRoute.params.subscribe(
      params => {
        this.query = params.query;
        this.currentPage = 0;
        this.moviesLoad();
      });
  }
  moviesLoad() {
    console.log(this.currentPage + ' loadM ' + this.pageSize);
    this.movies$ = this.movieService.searchMovies(this.query, this.currentPage + 1);
    //    this.movies$.subscribe(movies => (this.movies = movies));
    this.movies$.subscribe(movies => { this.movies = movies; console.log(movies); });
  }

  public handlePage(e: any) {
    console.log(e.pageIndex + ' ' + e.pageSize);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.moviesLoad();
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
    MatGridListModule,
    MatPaginatorModule
  ],
  exports: [
    MovieSearchComponent
  ]
})
export class MovieSearchModule { }
