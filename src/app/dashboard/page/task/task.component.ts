import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/_shared/models/dashboard/task.model';
import { Process } from './../../../_shared/models/dashboard/process.model';
import { TaskService } from './../../../_shared/services/dashboard/task.service';

@Component({
  selector: 'dashboard-task-page',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskPageComponent implements OnInit {
  task$: Observable<Task>;
  processes$: Observable<Partial<Process>[]>;
  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    const t$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.taskService.Select(params.get('taskId'));
      this.task$ = this.taskService.Task();
      this.processes$ = this.taskService.TaskProcesses();
    });
  }

  ngOnInit() {}
}
