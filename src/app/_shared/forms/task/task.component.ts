import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../../services/dashboard/task.service';

@Component({
  selector: 'edit-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class EditTaskComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}
}
