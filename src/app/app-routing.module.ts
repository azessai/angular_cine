import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieInfoModule, MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieSearchComponent, MovieSearchModule } from './movie-search/movie-search.component';
import { MoviePopularComponent, MoviePopularModule } from './movie-popular/movie-popular.component';



const routes: Routes = [
  { path: 'info/:movieId', component: MovieInfoComponent },
  { path: 'search/:query', component: MovieSearchComponent },
  { path: 'popular', component: MoviePopularComponent },
  { path: '**', component: MoviePopularComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MovieInfoModule,
    MovieSearchModule,
    MoviePopularModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
