import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  addDays,
  CalendarMonth,
  VenueBookingDaysService
} from '../../../_shared/services/booking-days.service';

@Component({
  selector: 'shop-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class ShopCalenderComponent implements OnInit {
  @Input()
  selectedDate;
  @Output()
  dateSelected = new EventEmitter<Date>();

  idxMonth = 0;
  nowDate = addDays(new Date(), -1);
  calendar: CalendarMonth[];
  month: CalendarMonth;
  constructor(private days: VenueBookingDaysService) {}

  ngOnInit() {
    this.calendar = this.days.getCalendar();
    this.month = this.calendar[this.idxMonth];
  }
  nextMonth() {
    this.idxMonth = this.idxMonth + 1;
    this.month = this.calendar[this.idxMonth];
  }
  prevMonth() {
    this.idxMonth = this.idxMonth - 1;
    this.month = this.calendar[this.idxMonth];
  }
  getMonthOffsetSpaces() {
    return [0, 1, 2, 3, 4, 5, 6].slice(0, this.month.offset);
  }
}
