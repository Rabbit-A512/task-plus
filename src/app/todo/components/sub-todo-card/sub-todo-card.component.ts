import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MatCheckboxChange } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DrawerDialogConfig } from 'src/app/shared/constants';

import { Todo } from '../../todo.entity';
import { TodoService } from '../../todo.service';
import {
  DeleteConfirmDialogComponent,
} from './../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { TodoFormComponent } from './../todo-form/todo-form.component';

@Component({
  selector: 'app-sub-todo-card',
  templateUrl: './sub-todo-card.component.html',
  styleUrls: ['./sub-todo-card.component.scss']
})
export class SubTodoCardComponent implements OnInit {
  @Input() todo: Todo;

  @Output() updated = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
  ) { }

  ngOnInit() {
  }

  deleteOne(): void {
    const dialogRef: MatDialogRef<DeleteConfirmDialogComponent, boolean> = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap(confirmDelete => confirmDelete ? this.todoService.deleteOneById(this.todo.id) : of(null)),
    ).subscribe(res => {
      // FIXME: remove log
      console.log(res);
      if (res !== null) {
        this.deleted.emit();
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
          this.updated.emit(shouldUpdate);
        }
      },
    });
  }

  handleFinishStatusChange(event: MatCheckboxChange) {
    const { id } = this.todo;
    this.todoService.updateOneById(id, { isFinished: event.checked }).subscribe({
      next: res => {
        this.updated.emit();
      },
    });
  }
}
