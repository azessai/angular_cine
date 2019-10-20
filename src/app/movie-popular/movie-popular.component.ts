import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';
import { MovieService } from '../service/movie.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MovieListModule } from '../movie-list/movie-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ca-movie-popular',
  templateUrl: './movie-popular.component.html',
  styleUrls: ['./movie-popular.component.scss']
})
export class MoviePopularComponent implements OnInit {
  movies: Movies;
  movies$: Observable<Movies>;
  currentPage = 0;

  pageSize = 20;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor( private movieService: MovieService) {}

  ngOnInit() {
    this.currentPage = 0;
    this.movies = new Movies({page: 0, total_results: 0, total_pages: 0, results: []});
    this.moviesLoad();
    // this.movieService.listGenre().subscribe(data => {  console.log(data); });
  }
  private moviesLoad() {
    console.log(this.currentPage + ' loadM ' + this.pageSize);

    // console.log(this.currentPage);
    this.movies$ = this.movieService.popularMovies(this.currentPage + 1);
    //    this.movies$ = this.movieService.searchMovies('Le', this.currentPage);
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
    MoviePopularComponent
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
    MoviePopularComponent
  ]
})
export class MoviePopularModule { }
