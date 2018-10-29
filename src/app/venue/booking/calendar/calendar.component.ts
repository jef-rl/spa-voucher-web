import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  addDays,
  CalendarMonth,
  VenueBookingDaysService,
  startOfDay
} from '../../../_shared/services/booking-days.service';

const today = startOfDay();
@Component({
  selector: 'venue-booking-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class VenueBookingCalendarComponent implements OnInit {
  @Input()
  selectedPackage;
  @Input()
  selectedDate = null;
  @Output()
  dateSelected = new EventEmitter<Date>();
  @Output()
  valueSelected = new EventEmitter<number>();

  nowDate = addDays(today, 5);
  calendar: CalendarMonth[];
  month: CalendarMonth;
  idxMonth = 0;
  constructor(private days: VenueBookingDaysService) {}

  ngOnInit() {
    this.idxMonth = this.nowDate.getUTCMonth() !== today.getUTCMonth() ? 1 : 0;
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
  getDayPrice(forDate: Date): number {
    const dayId = forDate.getUTCDay();
    const weekday = dayId > 0 ? dayId - 1 : 6;
    return this.selectedPackage.pricing[weekday];
  }
  getMonthOffsetSpaces() {
    return [0, 1, 2, 3, 4, 5, 6].slice(0, this.month.offset);
  }
}
