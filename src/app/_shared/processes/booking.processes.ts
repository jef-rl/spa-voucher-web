import { TaskDefinition } from '../models/dashboard/task-definition';

export const taskDefinitionBooking: TaskDefinition = {
  task: {
    processes: {
      criticals: 3,
      urgents: 0,
      highs: 2,
      mediums: 0,
      lows: 0,
      optionals: 0,
      required: 5,
      completed: 0
    }
  },
  processes: [
    {
      description: {
        short: 'contact spa',
        full: ''
      },
      priority: 'high',
      reminder: [1, 2, 3, -1]
    },
    {
      description: {
        short: 'check availability',
        full: ''
      },
      priority: 'critical'
    },
    {
      description: {
        short: 'book package',
        full: ''
      },
      priority: 'critical'
    },
    {
      description: {
        short: 'pay spa',
        full: ''
      },
      priority: 'high'
    },
    {
      description: {
        short: 'collect commision',
        full: ''
      },
      priority: 'critical'
    }
  ]
};
