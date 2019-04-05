import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange, MatDialog, MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  DeleteConfirmDialogComponent,
} from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { Todo } from '../../todo.entity';
import { TodoService } from '../../todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;

  @Output() subCreated = new EventEmitter<ShouldUpdateData>();
  @Output() subDeleted = new EventEmitter();
  @Output() subUpdated = new EventEmitter();
  @Output() parentDeleted = new EventEmitter();
  @Output() parentUpdated = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
  ) { }

  ngOnInit() {
  }

  createSubTodo(): void {
    const dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData> = this.dialog.open(TodoFormComponent, {
      ...DrawerDialogConfig,
      data: { parentId: this.todo.id }
    });

    dialogRef.afterClosed().subscribe({
      next: (res: ShouldUpdateData) => {
        this.subCreated.emit(res);
      },
    });
  }

  deleteOne(): void {
    const dialogRef: MatDialogRef<DeleteConfirmDialogComponent, boolean> = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap(confirmDelete => confirmDelete ? this.todoService.deleteOneById(this.todo.id) : of(null)),
    ).subscribe(res => {
      // FIXME: remove log
      console.log(res);
      if (res !== null) {
        this.parentDeleted.emit();
      }
    });
  }

  updateOne(): void {
    const dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData> = this.dialog.open(TodoFormComponent, {
      ...DrawerDialogConfig,
      data: this.todo,
    });

    dialogRef.afterClosed().subscribe({
      next: (shouldUpdate: ShouldUpdateData) => {
        if (shouldUpdate) {
          this.parentUpdated.emit(shouldUpdate);
        }
      },
    });
  }

  handleSubDeleted(): void {
    this.subDeleted.emit();
  }

  handleSubUpdated(): void {
    this.subUpdated.emit();
  }

  handleFinishStatusChange(event: MatCheckboxChange) {
    const { id } = this.todo;
    this.todoService.updateOneById(id, { isFinished: event.checked }).subscribe({
      next: res => {
        this.parentUpdated.emit();
      },
    });
  }

}
