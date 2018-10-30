import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-user',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UIUserComponent implements OnInit {
  @Input()
  user;
  @Input()
  small = false;
  constructor() {}

  ngOnInit() {}
}
