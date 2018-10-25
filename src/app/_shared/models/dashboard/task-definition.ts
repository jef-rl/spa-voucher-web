import { Task } from './task.model';
import { Process } from './process.model';

export interface TaskDefinition {
  task: Partial<Task>;
  processes: Partial<Process>[];
}
