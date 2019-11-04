import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, timer } from 'rxjs';
import { tap, map, filter, retry, catchError, last, takeUntil, finalize } from 'rxjs/operators';
import { TapDemoService } from './tap-demo.service';

@Component({
  selector: 'ca-tap-demo',
  templateUrl: './tap-demo.component.html',
  styleUrls: ['./tap-demo.component.scss']
})
export class TapDemoComponent implements OnInit {
  stdNames$: Observable<string[]>;
  countryName$: Observable<string>;
  countryStates: string[];

  constructor(private mapDemoService: TapDemoService) {}

  ngOnInit() {
    this.getStdNames();
    this.getCountryName();
    this.getCountryStates();

    // of(1, 2, 3, 4)
    //   .pipe(
    //     tap(
    //       el => console.log('Process ' + el),
    //       err => console.error(err),
    //       () => console.log('Complete')
    //     ),
    //     filter(n => n % 2 === 0)
    //   )
    //   .subscribe(el => console.log('Even number: ' + el));

    // const cities = ['Varanasi', 'Mathura', 'Ayodhya'];
    // of(cities)
    //   .pipe(
    //     tap(c => console.log(c.length)),
    //     map(dataArray => dataArray.join(', '))
    //   )
    //   .subscribe(res => console.log(res));

    const timer$ = timer(6000);
    const source = timer(1000, 2000).pipe(
      takeUntil(timer$),
      finalize(() => console.log('Sequence complete'))
    );
    // output: 0,1,2,3,4,5......
    const subscribe = source.subscribe(val => console.log(val));
  }

  getStdNames() {
    this.stdNames$ = this.mapDemoService.getStdNames().pipe(
      tap(std => console.log(std)),
      map(res => res.split(','))
    );
  }

  getCountryName() {
    this.countryName$ = this.mapDemoService.getCountry().pipe(
      tap(cname => console.log('Accessing country name...')),
      map(country => country.getCountryName()),
      tap(cname => console.log(cname)),
      catchError(err => {
        console.error(err);
        return of('');
      })
    );
  }

  getCountryStates() {
    this.mapDemoService
      .getCountry()
      .pipe(
        retry(2),
        tap(cname => console.log('Accessing country states...')),
        map(country => country.getCountryStates()),
        tap(states => console.log('states : ', states)),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe(res => (this.countryStates = res));
  }
}

@NgModule({
  declarations: [TapDemoComponent],
  imports: [CommonModule],
  exports: [TapDemoComponent]
})
export class TapDemoModule {}
