import { Component, Input, NgModule } from '@angular/core';
import { Movies } from '../models/movies';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { OrderModule } from 'ngx-order-pipe';
import { MoviePreviewModule } from '../movie-preview/movie-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'ca-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  @Input() movies: Movies;

  orderByPredicate = 'title';
  orderByReverse = false;
  constructor() {
  }

  clickPredicateName() {
    this.orderByReverse = !this.orderByReverse;
    this.orderByPredicate = 'title';
  }
  clickPredicateRate() {
    this.orderByReverse = !this.orderByReverse;
    this.orderByPredicate = 'vote_average';
  }
}

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    OrderModule,
    MoviePreviewModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    MovieListComponent
  ]
})
export class MovieListModule { }
