import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';


const routes: Routes = [
  {path: 'info/:movieId', component: MovieInfoComponent },
  {path: '**', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
