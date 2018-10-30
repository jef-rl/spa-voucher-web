import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-voucher',
  templateUrl: './voucher-ui.component.html',
  styleUrls: ['./voucher-ui.component.scss']
})
export class UIVoucherComponent implements OnInit {
  @Input()
  voucher;
  constructor() {}

  ngOnInit() {}
}
