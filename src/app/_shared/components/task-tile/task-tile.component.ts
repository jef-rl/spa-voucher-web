import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {
  @Input()
  task;
  @Input()
  users;
  @Input() routerLnk;
  @Output() ownerSelected  = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  selectUser(user) {
    this.ownerSelected.emit(user);
  }
}
