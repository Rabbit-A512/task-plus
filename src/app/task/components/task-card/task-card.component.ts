import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  DeleteConfirmDialogComponent,
} from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { Task } from '../../task.entity';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
  ) { }

  ngOnInit() {
  }

  handleFinishStatusChange(event: MatCheckboxChange) {
    const { id } = this.task;
    this.taskService.updateOneById(id, { isFinished: event.checked }).subscribe({
      next: res => {
        this.updated.emit();
      },
    });
  }

  updateOne(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      ...DrawerDialogConfig,
      data: this.task,
    });

    dialogRef.afterClosed().subscribe({
      next: updated => {
        if (updated) {
          this.updated.emit();
        }
      },
    });
  }

  deleteOne(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap(deleteConfirm => deleteConfirm ? this.taskService.deleteOneById(this.task.id) : of(null)),
    ).subscribe({
      next: res => {
        if (res !== null) {
          this.deleted.emit();
        }
      }
    });
  }

  loadTask() {
    const taskId = this.task.id;
    this.taskService.findOneById(taskId).subscribe({
      next: task => {
        this.task = task;
      }
    });
  }

}
