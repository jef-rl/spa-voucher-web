import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {
  @Input()
  task;
  @Input()
  expanded = false;
  constructor() {}

  ngOnInit() {}
}
