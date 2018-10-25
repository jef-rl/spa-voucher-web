import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../../services/dashboard/task.service';
import { Task } from '../../models/dashboard/task.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'edit-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class EditTaskComponent implements OnInit {
  model: Task = null;
  constructor(private taskService: TaskService) {
    this.taskService.Task().pipe(
      tap((task: Task) => {
        if (task) {
          this.model = task;
        }
      })
    ).subscribe();
  }

  ngOnInit() {}
  Update() {
    this.taskService.Update(this.model);
  }
  Add() {
    this.taskService.AddProcess(
      {
        description: {
          short: 'jefs extra process',
          full: ''
        },
        priority: 'optional'
      });
  }
}
