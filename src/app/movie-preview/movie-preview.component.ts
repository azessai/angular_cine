import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ca-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie: Movie;
  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  declarations: [
    MoviePreviewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule
  ],
  exports: [
    MoviePreviewComponent
  ]
})
export class MoviePreviewModule { }
