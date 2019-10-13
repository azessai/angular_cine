import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'ca-movie-header',
  templateUrl: './movie-header.component.html',
  styleUrls: ['./movie-header.component.scss']
})
export class MovieHeaderComponent {

  query: string;
  movieSearchForm = new FormGroup({
    query: new FormControl()
  });
  constructor( private router: Router) { }
  searchAction() {
    this.query = this.movieSearchForm.value.query;
    this.router.navigate(['search/', this.query]);
    this.movieSearchForm.controls.query.setValue('');
  }
}

@NgModule({
  declarations: [
    MovieHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    RouterModule
  ],
  exports: [
    MovieHeaderComponent
  ]
})
export class MovieHeaderModule { }
