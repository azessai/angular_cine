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
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MovieService } from '../service/movie.service';
import { MoviesDataSource } from './movies.datasource';
import { MatIconModule } from '@angular/material/icon';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'ca-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css']
})
export class MovieListingComponent implements OnInit, AfterViewInit {
  movies: Movies;
  dataSource: MoviesDataSource;

  displayedColumns = ['title', 'image', 'popularity', 'release_date'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}
  ngOnInit() {
    this.dataSource = new MoviesDataSource(this.movieService);

    this.dataSource.loadMovies('', 'desc', 0, 20);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadMoviesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMoviesPage()))
      .subscribe();
  }

  loadMoviesPage() {
    console.log(
      this.input.nativeElement.value,
      '-',
      this.paginator.pageIndex,
      '-'
    );

    this.dataSource.loadMovies(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      20
    );
  }
  navigate(id: BigInteger) {
    this.router.navigate(['info', id]);
  }
}

@NgModule({
  declarations: [MovieListingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule
  ],
  exports: [MovieListingComponent]
})
export class MovieListingModule {}
