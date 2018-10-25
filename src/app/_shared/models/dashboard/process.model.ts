import { Signed } from './signed.model';
import { isArray, isNullOrUndefined } from 'util';
import {
  DateCalculation
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
  reminder: Array<Date | DateCalculation | number>;
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

  rtnProcess.start = initProcess.start ? initProcess.start : new Date();
  rtnProcess.end = initProcess.end
    ? initProcess.end
    : initProcess.start
      ? initProcess.start
      : new Date();

  if (initProcess && initProcess.reminder && isArray(initProcess.reminder)) {
    rtnProcess.reminder = initProcess.reminder.map(remind => {
      if(isDateCalculation()) {

      }
    }
    );
  } else {
    rtnProcess.reminder = initProcess.reminder ? initProcess.reminder : [];
  }
  rtnProcess.activity = [];
  rtnProcess.closed = null;
  rtnProcess.accepted = null;

  return rtnProcess;
}
