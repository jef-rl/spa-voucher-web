import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { Observable } from 'rxjs';
import { UserAccount } from 'src/app/_shared/models/user-account.model';
import { Task } from 'src/app/_shared/models/dashboard/task.model';
import { TaskService } from 'src/app/_shared/services/dashboard/task.service';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  tasks$: Observable<Task[]>;
  admins$: Observable<UserAccount[]>;
  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.admins$ = this.userService.getAdmins();
    this.tasks$ = this.taskService.Tasks();
  }

  Select(id) {
    this.taskService.Select(id);
  }
  ownerSelected(user, task) {
    console.log(user,task);
    this.taskService.assignOwner(user, task);
  }
}
