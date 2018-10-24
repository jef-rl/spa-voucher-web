import { Observable } from 'rxjs';
import { TaskService } from './../../_shared/services/dashboard/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_shared/models/dashboard/task.model';

@Component({
  selector: 'dashboard-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class DashboardTasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.Tasks();
  }

  ngOnInit() {}
}
