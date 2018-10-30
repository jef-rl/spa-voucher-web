import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-process-bottom-sheet',
  templateUrl: './process-bottom-sheet.component.html',
  styleUrls: ['./process-bottom-sheet.component.scss']
})
export class ProcessBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProcessBottomSheetComponent>
  ) {}

  ngOnInit() {}

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
