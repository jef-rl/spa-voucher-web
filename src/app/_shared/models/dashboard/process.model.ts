import { Signed } from './signed.model';

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
  schedule: {
    start: Date;
    deadline: Date;
  };
  remind: {
    kind: 'none' | 'every' | 'before';
    hours: number;
  };
  activity: Activity[];
  closed: Signed;
  accepted: Signed;
}

export function NewProcess(initProcess: Partial<Process>): Process {
  return {
    id: initProcess.id ? initProcess.id : null,
    taskId: initProcess.taskId ? initProcess.taskId : null,
    ownerUid: initProcess.ownerUid ? initProcess.ownerUid : null,
    description: initProcess.description
      ? initProcess.description
      : {
          short: '',
          full: ''
        },
    priority: initProcess.priority ? initProcess.priority : null,
    schedule: initProcess.schedule
      ? initProcess.schedule
      : {
          start: new Date(),
          deadline: new Date()
        },
    remind: initProcess.remind
      ? initProcess.remind
      : {
          kind: null,
          hours: 0
        },
    activity: [],
    closed: null,
    accepted: null
  };
}
