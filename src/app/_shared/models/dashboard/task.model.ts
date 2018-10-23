import { Signed } from './signed.model';

export interface Task {
  id: string;
  ownerUid: string | 'system';
  forKind: string;
  forId: string;
  created: Date;
  deadline: Date;
  closed: Signed;
  approval: Signed;
  archiveOn: Date;
  processes: {
    criticals: number;
    urgents: number;
    highs: number;
    mediums: number;
    lows: number;
    optionals: number;
    required: number;
    completed: number;
  };
}

export function NewTask(initTask: Partial<Task>): Task {
  return {
    id: initTask.id ? initTask.id : null,
    ownerUid: null,
    forKind: initTask.forKind ? initTask.forKind : 'error',
    forId: initTask.forId ? initTask.forId : 'error',
    created: new Date(),
    deadline: initTask.deadline ? initTask.deadline : new Date(),
    closed: null,
    approval: null,
    archiveOn: null,
    processes: {
      criticals: 0,
      urgents: 0,
      highs: 0,
      mediums: 0,
      lows: 0,
      optionals: 0,
      required: 0,
      completed: 0
    }
  };
}
