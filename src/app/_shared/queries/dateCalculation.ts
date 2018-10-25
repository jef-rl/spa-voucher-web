import { addDays } from '../services/booking-days.service';
import { isDate, isNumber } from 'util';

export interface DateOffset
export interface DateCalculation {
  date: Date;
  offset: number;
}
function isDateCalculation(
  checkValue: DateCalculation | any
): checkValue is DateCalculation {
  return (
    (<DateCalculation>checkValue).date !== undefined &&
    (<DateCalculation>checkValue).offset !== undefined
  );
}
export function calculateDate(init: Date | DateCalculation | number) {
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
