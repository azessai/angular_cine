import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ca-movie-header',
  templateUrl: './movie-header.component.html',
  styleUrls: ['./movie-header.component.scss']
})
export class MovieHeaderComponent{

  query: string;
  movieSearchForm = new FormGroup({
    query: new FormControl()
  });
  constructor( private router: Router) { }
  searchAction() {
    this.query = this.movieSearchForm.value.query;
    this.router.navigate(['search/', this.query]);
  }
}
