import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieInfoModule, MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieSearchComponent, MovieSearchModule } from './movie-search/movie-search.component';
import { MoviePopularComponent, MoviePopularModule } from './movie-popular/movie-popular.component';
import { MovieListingModule, MovieListingComponent } from './movie-listing/movie-listing.component';
import { EssaiComponent } from './essai/essai.component';



const routes: Routes = [
  { path: 'info/:movieId', component: MovieInfoComponent },
  { path: 'search/:query', component: MovieSearchComponent },
  { path: 'popular', component: MoviePopularComponent },
  { path: 'listing', component: MovieListingComponent },
  { path: 'essai', component: EssaiComponent},
  { path: '**', component: MoviePopularComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MovieInfoModule,
    MovieSearchModule,
    MoviePopularModule,
    MovieListingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
