import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { OrderModule } from 'ngx-order-pipe';
import { MovieHeaderComponent } from './movie-header/movie-header.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MoviePopularComponent } from './movie-popular/movie-popular.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MoviePreviewComponent,
    MovieInfoComponent,
    MovieHeaderComponent,
    MovieSearchComponent,
    MoviePopularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OrderModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
