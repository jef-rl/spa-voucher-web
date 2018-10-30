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
  @Output()
  ownerSelected = new EventEmitter();
  @Output()
  addActivity = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  selectUser(user) {
    this.ownerSelected.emit(user);
  }
  activityAdd() {
    this.addActivity.emit();
  }
  getDisplayUser(uid) {
    const rtn = this.users.filter(usr => usr && usr.uid && usr.uid === uid);
    return rtn && rtn.length && rtn.length > 0 ? rtn[0] : null;
  }
}
