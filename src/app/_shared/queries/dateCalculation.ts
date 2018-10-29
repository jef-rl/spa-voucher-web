import { addDays, startOfDay } from '../services/booking-days.service';
import { isDate, isNumber } from 'util';

export interface DateOffsetCalculation {
  date: Date;
  offset: number;
}
export function isDateCalculation(
  checkValue: DateOffsetCalculation | any
): checkValue is DateOffsetCalculation {
  return (
    (<DateOffsetCalculation>checkValue).date !== undefined &&
    (<DateOffsetCalculation>checkValue).offset !== undefined
  );
}
export function calculateDate(init: DateOffsetCalculation): Date {
  if (isDateCalculation(init)) {
    return addDays(startOfDay(init.date), init.offset);
  } else {
    return null;
  }
}
