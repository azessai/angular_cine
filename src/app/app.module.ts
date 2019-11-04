import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieHeaderModule } from './movie-header/movie-header.component';
import { EssaiModule } from './essai/essai.component';
import { TapDemoModule } from './tap-demo/tap-demo.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieHeaderModule,
    EssaiModule,
    TapDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
