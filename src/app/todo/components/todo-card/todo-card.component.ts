import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
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

  @Output() addSubDialogClosed = new EventEmitter<ShouldUpdateData>();
  @Output() subDeleted = new EventEmitter<any>();
  @Output() subUpdated = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
  ) { }

  ngOnInit() {
  }

  openTodoForm(): void {
    const dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData> = this.dialog.open(TodoFormComponent, {
      ...DrawerDialogConfig,
      data: { parentId: this.todo.id }
    });

    dialogRef.afterClosed().subscribe({
      next: (res: ShouldUpdateData) => {
        this.addSubDialogClosed.emit(res);
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
        this.deleted.emit();
      }
    });
  }

  handleSubDeleted(): void {
    this.subDeleted.emit();
  }

  handleSubUpdated(): void {
    this.subUpdated.emit();
  }

}
