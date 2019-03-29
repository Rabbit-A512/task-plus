import { CreateTodoDto } from './../../dto/create-todo.dto';
import { TodoService } from './../../todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ISubTodoDialogData } from '../../interfaces/create-sub-todo.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent>,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private subTodoDialogData: ISubTodoDialogData,
  ) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      // createdAt: [(new Date()).toISOString()],
      // planToFinishAt: [''],
    });
  }

  handleSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    // FIXME: remove log
    console.log(this.todoForm.value);
    const reqBody: CreateTodoDto = _.assign(this.todoForm.value, { parentId: this.subTodoDialogData.parentId })
    // FIXME: remove log
    console.log(reqBody);
    this.todoService.createOne(reqBody).subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open('添加成功', 'OK', { duration: 1500 });
        this.dialogRef.close();
      },
    });
  }

  handleCancel() {
    this.dialogRef.close();
  }

  get titleControl() {
    return this.todoForm.get('title');
  }

  get descriptionControl() {
    return this.todoForm.get('description');
  }

}
