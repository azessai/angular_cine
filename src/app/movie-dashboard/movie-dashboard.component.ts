import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'ca-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 11', cols: 2, rows: 1, content: 'Contenu de la carte 1' },
        { title: 'Card 2', cols: 1, rows: 1, content: 'Contenu de la carte 2' },
        { title: 'Card 3', cols: 1, rows: 2, content: 'Contenu de la carte 3' },
        { title: 'Card 4', cols: 1, rows: 1, content: 'Contenu de la carte 4' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
