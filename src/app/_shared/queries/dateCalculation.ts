import { addDays } from '../services/booking-days.service';
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
export function calculateDate(init: Date | DateOffsetCalculation | number) {
  init = init ? init : new Date();
  if (isDate(init)) {
  } else if (isNumber(init)) {
    return addDays(new Date(), init);
  } else if (isDateCalculation(init)) {
    init = addDays(init.date, init.offset);
  } else {
    return init;
  }
}
