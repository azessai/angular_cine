import {
  AfterViewInit,
  Component,
  NgModule,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movies } from '../models/movies';
import { ActivatedRoute } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovieService } from '../service/movie.service';
import { MoviesDataSource } from './movies.datasource';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'ca-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css']
})
export class MovieListingComponent implements OnInit, AfterViewInit {
  movies: Movies;
  dataSource: MoviesDataSource;

  displayedColumns = ['title', 'id', 'release_date'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  ngOnInit() {
    this.dataSource = new MoviesDataSource(this.movieService);

    this.dataSource.loadMovies(0, '', 'asc', 0, 20);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;

    //       this.loadMoviesPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMoviesPage()))
      .subscribe();
  }

  loadMoviesPage() {
    this.dataSource.loadMovies(0, '', 'asc', this.paginator.pageIndex, 20);
  }
}

@NgModule({
  declarations: [MovieListingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginator,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule
  ],
  exports: [MovieListingComponent]
})
export class MovieListingModule {}
