import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../../todo.service';
import { ITodoDialogData } from '../../interfaces/todo-dialog-data.interface';
import { CreateTodoDto } from '../../dto/create-todo.dto';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-parent-todo-form',
  templateUrl: './add-parent-todo-form.component.html',
  styleUrls: ['./add-parent-todo-form.component.scss']
})
export class AddParentTodoFormComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent, ShouldUpdateData>,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private subTodoDialogData: ITodoDialogData,
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
    const reqBody: CreateTodoDto = _.assign(this.todoForm.value, { parentId: this.subTodoDialogData.parentId });
    // FIXME: remove log
    console.log(reqBody);
    this.todoService.createOne(reqBody).subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open('添加成功', 'OK', { duration: 1500 });
        this.dialogRef.close(true);
      },
    });
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

  get titleControl() {
    return this.todoForm.get('title');
  }

  get descriptionControl() {
    return this.todoForm.get('description');
  }
}
