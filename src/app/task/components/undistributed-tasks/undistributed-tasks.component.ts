import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { Task } from '../../task.entity';
import { TaskService } from '../../task.service';
import { GroupService } from './../../../group/group.service';
import { TaskFormComponent } from './../task-form/task-form.component';
import { EntityId } from 'src/app/shared/interfaces/entity-service.interface';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-undistributed-tasks',
  templateUrl: './undistributed-tasks.component.html',
  styleUrls: ['./undistributed-tasks.component.scss']
})
export class UndistributedTasksComponent implements OnInit {

  @Output() updatedOne = new EventEmitter();
  @Output() deletedOne = new EventEmitter();

  undistributedTasks: Task[];
  taskColumns = ['id', 'title', 'description', 'operations'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupService: GroupService,
    private readonly taskService: TaskService,
  ) { }

  ngOnInit() {
    this.loadUndistributedTasks();
  }

  loadUndistributedTasks(): void {
    this.groupService.currentGroupId.pipe(
      switchMap(groupId => this.taskService.findManyByCondition({
        groupId,
        isFinished: false,
      })),
    ).subscribe({
      next: res => {
        this.undistributedTasks = res.data;
      }
    });
  }

  handleUpdateTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      ...DrawerDialogConfig,
      data: task,
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.updatedOne.emit();
        }
      }
    });
  }

  handleDeleteTask(taskdI: EntityId) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap(confirmDelete => confirmDelete ? this.taskService.deleteOneById(taskdI) : of(null)),
    ).subscribe({
      next: res => {
        if (res !== null) {
          this.deletedOne.emit();        }
      }
    });
  }

}
