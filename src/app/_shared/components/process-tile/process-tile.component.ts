import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { startOfDay } from '../../services/booking-days.service';

@Component({
  selector: 'dashboard-process-tile',
  templateUrl: './process-tile.component.html',
  styleUrls: ['./process-tile.component.scss']
})
export class ProcessTileComponent implements OnInit {
  nowdate = startOfDay(new Date());
  @Input()
  process;
  @Input()
  users;
  @Output() ownerSelected  = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  selectUser(user) {
    this.ownerSelected.emit(user);
  }
}
