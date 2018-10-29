import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/_shared/models/dashboard/task.model';
import { UserAccount } from 'src/app/_shared/models/user-account.model';
import {
  addDays,
  startOfDay
} from 'src/app/_shared/services/booking-days.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { Process } from './../../../_shared/models/dashboard/process.model';
import { TaskService } from './../../../_shared/services/dashboard/task.service';

@Component({
  selector: 'dashboard-task-page',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskPageComponent implements OnInit {
  nowdate = addDays(startOfDay(), -1);
  task$: Observable<Task>;
  processes$: Observable<Partial<Process>[]>;
  admins$: Observable<UserAccount[]>;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const t$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.taskService.Select(params.get('taskId'));
      this.task$ = this.taskService.Task();
      this.processes$ = this.taskService.TaskProcesses();
    });
  }

  ngOnInit() {
    this.admins$ = this.userService.getAdmins();
  }
  drop(ev) {
    console.log(ev);
    if (ev && ev.item && ev.item.data && ev.item.data.length === 2) {
      const task = ev.item.data[1][ev.currentIndex];
      const admin = ev.item.data[0];
      console.log(task, admin);
    }
  }
  entered(event: CdkDragEnter) {
    console.log('Entered', event.item.data);
  }
  exited(event: CdkDragExit) {
    console.log('Exited', event.item.data);
  }
  dropat(t) {
    console.log(t);
  }
  Select(id) {
    this.taskService.Select(id);
  }
  ownerSelected(user, task) {
    this.taskService.assignOwner(user, task);
  }
  ownerProcessSelected(user, process) {
    this.taskService.assignProcessOwner(user, process);
  }
}
