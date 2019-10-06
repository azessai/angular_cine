import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MoviePopularComponent } from './movie-popular/movie-popular.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';


const routes: Routes = [
  {path: 'info/:movieId', component: MovieInfoComponent },
  {path: 'search/:query', component: MovieSearchComponent },
  {path: 'popular', component: MoviePopularComponent },
  {path: '**', component: MoviePopularComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
