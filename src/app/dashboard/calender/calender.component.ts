import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import {
  addDays,
  CalendarDaysService,
  CalendarMonth,
  startOfDay
  } from './../../_shared/services/calendar-days.service';

@Component({
  selector: 'dashboard-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class DashboardCalenderComponent implements OnInit {
  @Input()
  selectedDate;
  @Output()
  dateSelected = new EventEmitter<Date>();

  idxMonth = 0;
  nowDate = addDays(startOfDay(), -1);
  calendar: CalendarMonth[];
  month: CalendarMonth;
  constructor(private days: CalendarDaysService) {}

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
