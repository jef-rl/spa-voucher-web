import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-activity-bottom-sheet',
  templateUrl: './activity-bottom-sheet.component.html',
  styleUrls: ['./activity-bottom-sheet.component.scss']
})
export class ActivityBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ActivityBottomSheetComponent>
  ) {}

  ngOnInit() {}

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
  confirm() {
    this.bottomSheetRef.dismiss(true);
  }
}
