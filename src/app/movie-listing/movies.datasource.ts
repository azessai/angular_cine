import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { catchError, finalize, map } from 'rxjs/operators';
import { MovieService } from '../service/movie.service';
import { Movie } from '../models/movie';
import { Movies } from '../models/movies';

export class MoviesDataSource implements DataSource<Movie> {
  private MoviesSubject = new BehaviorSubject<Movie[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  moviePageList$: Observable<Movies>;

  constructor(private movieService: MovieService) {}

  loadMovies(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    console.log(filter, '-', sortDirection, '-', pageIndex, '-', pageSize);
    this.loadingSubject.next(true);
    console.log('-', filter, '-');
    if ('' + filter !== '0' && filter !== '') {
      this.moviePageList$ = this.movieService
        .searchMovies(filter, pageIndex + 1);
    } else {
      this.moviePageList$ = this.movieService
        .popularDiscoverMovies(pageIndex + 1, sortDirection);
    }

    this.moviePageList$
    .pipe(map(movies => movies.results))
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(data => this.MoviesSubject.next(data));
  }

  connect(collectionViewer: CollectionViewer): Observable<Movie[]> {
    console.log('Connecting data source');
    return this.MoviesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.MoviesSubject.complete();
    this.loadingSubject.complete();
  }
}
