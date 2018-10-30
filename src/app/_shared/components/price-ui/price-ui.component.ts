import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-price',
  templateUrl: './price-ui.component.html',
  styleUrls: ['./price-ui.component.scss']
})
export class UIPriceComponent implements OnInit {
@Input() price: number;
  constructor() { }

  ngOnInit() {
  }

}
