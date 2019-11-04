import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { tap, filter, map, scan, last } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'ca-essai',
  templateUrl: './essai.component.html',
  styleUrls: ['./essai.component.css']
})
export class EssaiComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // of(1, 2, 3, 4)
    //   .pipe(
    //     tap(
    //       el => console.log('Element : ' + el),
    //       err => console.error(err),
    //       () => console.log('Complete')
    //     ),
    //     filter(n => n % 2 === 0)
    //   )
    //   .subscribe(el => console.log('Even number: ' + el));

    of(1, 2, 3, 4)
      .pipe(
        tap(el => console.log(el)),
        filter(n => n % 2 === 0),
        tap(el => console.log('- ', el)),
        map(n => n + 10),
        tap(el => console.log('-- ', el)),
        scan((sum, n) => sum + n),
        tap(el => console.log('--- ', el))
      )
      .pipe(last())
      .subscribe(result => console.log('Result: ' + result));

    const githubUsers = `https://api.github.com/users?per_page=2`;

    const users = ajax.getJSON(githubUsers);

    const subscribe = users.subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }
}

@NgModule({
  declarations: [EssaiComponent],
  imports: [CommonModule],
  exports: [EssaiComponent]
})
export class EssaiModule {}
