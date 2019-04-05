import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

import { ITodoDialogData } from '../../interfaces/todo-dialog-data.interface';
import { TodoService } from './../../todo.service';
import { Todo } from '../../todo.entity';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  private _isCreating: boolean; // true->创建，false->编辑

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData>,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private todoDialogData: Partial<Todo>,
  ) { }

  ngOnInit() {
    const {
      title,
      description,
      id,
      // parentId,
    } = this.todoDialogData;

    this._isCreating = !id;

    this.todoForm = this.fb.group({
      title: [title || '', [Validators.required]],
      description: [description || ''],
      // createdAt: [(new Date()).toISOString()],
      // planToFinishAt: [''],
    });
  }

  handleSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    const {
      parentId,
      id,
    } = this.todoDialogData;

    // 新建时有可能需要指定parent（创建子任务的情况），但是更新时不允许更新parent
    const reqBody = this.isCreating ? _.assign(this.todoForm.value, { parentId }) : this.todoForm.value;
    const req$ = this.isCreating ? this.todoService.createOne(reqBody) : this.todoService.updateOneById(id, reqBody);

    req$.subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open('操作成功', 'OK', { duration: 1500 });
        this.dialogRef.close(true);
      },
    });

  }

  handleCancel() {
    // `false` indicates that the parent component should not update data
    this.dialogRef.close(false);
  }

  get titleControl() {
    return this.todoForm.get('title');
  }

  get descriptionControl() {
    return this.todoForm.get('description');
  }

  get isCreating() {
    return this._isCreating;
  }

}
