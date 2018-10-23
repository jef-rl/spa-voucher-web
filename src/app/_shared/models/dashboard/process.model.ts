import { Signed } from './signed.model';

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
    kind: 'every' | 'before';
    hours: number;
  };
  closed: Signed;
  accepted: Signed;
}
