import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-date',
  templateUrl: './date-ui.component.html',
  styleUrls: ['./date-ui.component.scss']
})
export class UIDateComponent implements OnInit {
  @Input() date: Date;
  constructor() { }

  ngOnInit() {
  }

}
