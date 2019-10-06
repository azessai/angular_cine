import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../models/movies';

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
