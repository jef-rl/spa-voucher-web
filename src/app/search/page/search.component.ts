import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import { AutofillMonitor } from '@angular/cdk/text-field';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('animateSearch', [
      state('start', style({ transform: 'scale(1)', margin: '0px 0px' })),
      transition('void => *', [
        style({ transform: 'scale(2)', margin: '100px 0px' }),
        animate(
          '10000ms',
          keyframes([
            style({ transform: 'scale(5)', margin: '100px 0px', offset: 0.0 }),
            style({ transform: 'scale(1)', margin: '100px 0px', offset: 0.1 }),
            style({ transform: 'scale(1)', margin: '100px 0px', offset: 0.9 }),
            style({ transform: 'scale(1)', margin: '0px 0px', offset: 1 })
          ])
        )
      ]),
      transition('* => void', [animate(1000, style({ transform: 'scale(0)' }))])
    ])
  ]
})
export class SearchPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
