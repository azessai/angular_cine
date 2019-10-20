import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ca-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie: Movie;
  starCount = 10;
  ratingArr = [];
  color = 'accent';

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  showIcon(index: number) {
    if (this.movie.vote_average >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
@NgModule({
  declarations: [
    MoviePreviewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    MoviePreviewComponent
  ]
})
export class MoviePreviewModule { }
