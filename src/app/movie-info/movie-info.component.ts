import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ca-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent {

  movie: Movie;
  loading = true;
  movie$ = this.activatedRoute.paramMap
  .pipe(
    map(paramMap => paramMap.get('movieId')),
    switchMap(movieId => this.movieService.getMovieInfo(movieId)),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );


  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) {
    this.movie$.subscribe(movie => {
      this.movie = movie;
      this.loading = false;
    });
  }

}

@NgModule({
  declarations: [
    MovieInfoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    MovieInfoComponent
  ]
})
export class MovieInfoModule { }
