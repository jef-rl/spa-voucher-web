import { Signed } from './signed.model';
import { isArray, isNullOrUndefined, isNumber, isDate } from 'util';
import {
  DateOffsetCalculation,
  calculateDate,
  isDateCalculation
} from '../../queries/dateCalculation';

export interface Activity {
  action: string;
  signed: Signed;
}
export interface Process {
  id: string;
  taskId: string;
  ownerUid: string;
  description: {
    short: string;
    full: string;
  };
  priority: 'critical' | 'urgent' | 'high' | 'medium' | 'low' | 'optional';
  start: Date;
  end: Date;
  reminder: Array<Date | DateOffsetCalculation | number>;
  activity: Activity[];
  closed: Signed;
  accepted: Signed;
}

const emptyProcess: Process = {
  id: null,
  taskId: null,
  ownerUid: null,
  description: {
    short: null,
    full: null
  },
  priority: null,
  start: null,
  end: null,
  reminder: [],
  activity: [],
  closed: null,
  accepted: null
};
export function NewProcess(initProcess: Partial<Process>): Process {
  if (isNullOrUndefined(initProcess)) {
    return null;
  }
  const rtnProcess: Process = emptyProcess;

  rtnProcess.id = initProcess.id ? initProcess.id : null;
  rtnProcess.taskId = initProcess.taskId ? initProcess.taskId : null;
  rtnProcess.ownerUid = initProcess.ownerUid ? initProcess.ownerUid : null;
  rtnProcess.description = initProcess.description
    ? initProcess.description
    : {
        short: '',
        full: ''
      };
  rtnProcess.priority = initProcess.priority ? initProcess.priority : null;

  const start = rtnProcess.start = initProcess.start ? initProcess.start : new Date();
  const end = rtnProcess.end = initProcess.end
    ? initProcess.end
    : initProcess.start
      ? initProcess.start
      : new Date();

  if (initProcess && initProcess.reminder && isArray(initProcess.reminder)) {
    rtnProcess.reminder = initProcess.reminder.reduce((reminders, remind) => {
      let rtn = null;
      if (isDate(remind)) {
        rtn = remind;
      }
      if (isNumber(remind)) {
        rtn =
          remind >= 0
            ? calculateDate({ date: start, offset: remind })
            : calculateDate({ date: end, offset: remind });
      } else if (isDateCalculation(remind)) {
        rtn = calculateDate(remind);
      }
      return isNullOrUndefined(rtn) ? reminders : [...reminders, remind];
    }, []);
  } else {
    rtnProcess.reminder = initProcess.reminder ? initProcess.reminder : [];
  }
  rtnProcess.activity = [];
  rtnProcess.closed = null;
  rtnProcess.accepted = null;

  return rtnProcess;
}
