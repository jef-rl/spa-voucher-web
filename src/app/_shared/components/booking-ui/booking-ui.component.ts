import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-booking',
  templateUrl: './booking-ui.component.html',
  styleUrls: ['./booking-ui.component.scss']
})
export class UIBookingComponent implements OnInit {
@Input() booking;
  constructor() { }

  ngOnInit() {
  }

}
