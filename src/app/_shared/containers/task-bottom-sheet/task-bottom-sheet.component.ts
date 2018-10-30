import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-task-bottom-sheet',
  templateUrl: './task-bottom-sheet.component.html',
  styleUrls: ['./task-bottom-sheet.component.scss']
})
export class TaskBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<TaskBottomSheetComponent>
  ) {}

  ngOnInit() {}

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
