import { GroupService } from './../../../group/group.service';
import { TaskService } from './../../task.service';
import { Task } from './../../task.entity';
import { User } from './../../../user/user.entity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {

  @Input() user: User;

  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter();

  tasks: Task[];

  constructor(
    private readonly taskService: TaskService,
    private readonly groupService: GroupService,
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.findManyByCondition({
      userId: this.user.id,
      groupId: this.groupService.currentGroup.id,
    }).subscribe({
      next: res => {
        this.tasks = res.data;
      },
    });
  }

  handleUpdated(): void {
    this.updated.emit();
  }

  handleDeleted(): void {
    this.deleted.emit();
  }

}
