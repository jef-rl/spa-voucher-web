import { ActivityBottomSheetComponent } from './../../../_shared/containers/activity-bottom-sheet/activity-bottom-sheet.component';
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
import { MatBottomSheet } from '@angular/material';

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
    private userService: UserService,
    private bottomSheet: MatBottomSheet
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
  Select(id) {
    this.taskService.Select(id);
  }
  ownerSelected(user, task) {
    this.taskService.assignOwner(user, task);
  }
  ownerProcessSelected(user, process) {
    this.taskService.assignProcessOwner(user, process);
  }
  openActivityBottomSheet() {
    const addSheet = this.bottomSheet.open(ActivityBottomSheetComponent);

    addSheet.afterDismissed().subscribe(result => {
      if (result) {
        this.taskService.AddProcess(   {
          description: {
            short: 'optional additional process',
            full: ''
          },
          priority: 'optional',
          reminder: [1]
        });
      }
    });
  }
}
