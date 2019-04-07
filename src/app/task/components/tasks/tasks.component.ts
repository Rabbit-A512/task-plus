import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import {
  ChooseDefaultGroupComponent,
} from './../../../group/components/choose-default-group/choose-default-group.component';
import { GroupService } from './../../../group/group.service';
import { User } from './../../../user/user.entity';
import { Task } from './../../task.entity';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  participatorsControl = new FormControl([]);
  participators: User[];
  undistributedTasks: Task[];

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupService: GroupService,
    private readonly taskService: TaskService,
  ) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll(): void {
    this.loadParticipators();
    this.loadUndistributedTasks();
  }

  loadParticipators(): void {
    const currentGroupId = this.groupService.currentGroup.id;
    this.groupService.findParticipatorsByGroupId(currentGroupId).subscribe({
      next: res => {
        this.participators = res.data;
      },
    });
  }

  loadUndistributedTasks(): void {
    const currentGroupId = this.groupService.currentGroup.id;
    this.taskService.findManyByCondition({
      groupId: currentGroupId,
      userId: null,
    }).subscribe({
      next: res => {
        this.undistributedTasks = res.data;
      },
    });
  }

  get currentGroup() {
    return this.groupService.currentGroup;
  }

  chooseCurrentGroup() {
    const dialogRef = this.dialog.open(ChooseDefaultGroupComponent);

    dialogRef.afterClosed().subscribe({
      next: choosedGroup => {
        if (choosedGroup) {
          this.groupService.setUpDefaultGroup();
          this.loadAll();
        }
      },
    });

  }

  handleParticipatorsChange() {
    const participatorIds = this.participatorsControl.value as number[];
    if (participatorIds.length === 0) {
      this.loadParticipators(); // 列表为空表示显示所有人的任务
    } else {
      this.participators = this.participators.filter(user => participatorIds.indexOf(user.id) >= 0);
    }
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      ...DrawerDialogConfig,
      data: {},
    });

    dialogRef.afterClosed().subscribe({
      next: shouldUpdate => {
        if (shouldUpdate) {
          this.loadAll();
        }
      },
    });
  }

}
