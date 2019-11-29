import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, from, throwError, interval, merge } from 'rxjs';
import {
  tap,
  filter,
  map,
  scan,
  last,
  catchError,
  mergeMap,
  mapTo
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'ca-essai',
  templateUrl: './essai.component.html',
  styleUrls: ['./essai.component.css']
})
export class EssaiComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    from([1, 2, 3, 4])
      .pipe(
        tap(
          el => console.log('Element : ' + el),
          err => console.error(err),
          () => console.log('Complete')
        ),
        filter(n => n % 2 === 0)
      )
      .subscribe(el => console.log('Even number: ' + el));

    // of(1, 2, 3, 4)
    //   .pipe(
    //     tap(el => console.log(el)),
    //     filter(n => n % 2 === 0),
    //     tap(el => console.log('- ', el)),
    //     map(n => n + 10),
    //     tap(el => console.log('-- ', el)),
    //     scan((sum, n) => sum + n),
    //     tap(el => console.log('--- ', el))
    //   )
    //   .pipe(last())
    //   .subscribe(result => console.log('Result: ' + result));

    // const githubUsers = `https://api.github.com/users?per_page=2`;

    // const users = ajax(githubUsers);

    // const subscribe = users.subscribe(
    //   res => console.log(res),
    //   err => console.error(err)
    // );

    // // emit array as a sequence of values
    // const arraySource = from([1, 2, 3, 4, 5]);
    // // output: 1,2,3,4,5
    // const subscribe = arraySource.subscribe(val => console.log(val));

    // // emit result of promise
    // const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
    // // output: 'Hello World'
    // const subscribe = promiseSource.subscribe(val => console.log(val));

    // // works on js collections
    // const map1 = new Map();
    // map1.set(1, 'Hi');
    // map1.set(2, 'Bye');

    // const mapSource = from(map1);
    // // output: [1, 'Hi'], [2, 'Bye']
    // const subscribe = mapSource.pipe(
    //   map(val => val[1])
    // )
    // .subscribe(val => console.log(val));

    // // emit error
    // const source = throwError('This is an error!');
    // const valeurs = of(1, 2, 3);
    // //    const observable = source.pipe(merge(valeurs));
    // const observable = merge(valeurs, source);
    // // gracefully handle error, returning observable with error message
    // const example = observable.pipe(
    //   map(data => console.log('data : ', data)),
    //   catchError(val => of(`I caught: ${val}`))
    // );
    // // output: 'I caught: This is an error'
    // const subscribe = example.subscribe(val => console.log(val));

    // // emit every 2.5 seconds
    // const first = interval(2500);
    // // emit every 2 seconds
    // const second = interval(2000);
    // // emit every 1.5 seconds
    // const third = interval(1500);
    // // emit every 1 second
    // const fourth = interval(1000);

    // // emit outputs from one observable
    // const example = merge(
    //   first.pipe(mapTo('FIRST!')),
    //   second.pipe(mapTo('SECOND!')),
    //   third.pipe(mapTo('THIRD')),
    //   fourth.pipe(mapTo('FOURTH'))
    // );
    // // output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    // const subscribe = example.subscribe(val => console.log(val));
  }
}

@NgModule({
  declarations: [EssaiComponent],
  imports: [CommonModule],
  exports: [EssaiComponent]
})
export class EssaiModule {}
