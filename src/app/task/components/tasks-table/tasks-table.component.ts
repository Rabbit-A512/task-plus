import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GroupService } from 'src/app/group/group.service';
import {
  DeleteConfirmDialogComponent,
} from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DrawerDialogConfig } from 'src/app/shared/constants';
import { EntityId } from 'src/app/shared/interfaces/entity-service.interface';

import { Task } from '../../task.entity';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  @Input() tasks: Task[];

  @Output() updatedOne = new EventEmitter();
  @Output() deletedOne = new EventEmitter();

  taskColumns = ['id', 'title', 'description', 'operations'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupService: GroupService,
    private readonly taskService: TaskService,
  ) { }

  ngOnInit() {
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
