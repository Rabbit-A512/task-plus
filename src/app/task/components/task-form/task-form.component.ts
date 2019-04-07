import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

import { TaskPriority } from '../../task.entity';
import { TaskService } from '../../task.service';
import { GroupService } from './../../../group/group.service';
import { User } from './../../../user/user.entity';
import { TaskDialogData } from './../../utils/custom-types';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  participators: User[];

  private _isCreating: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<TaskFormComponent, ShouldUpdateData>,
    private readonly taskService: TaskService,
    private readonly snackBar: MatSnackBar,
    private readonly groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) private taskDialogData: TaskDialogData,
  ) { }

  ngOnInit() {
    const {
      id,
      title,
      description,
      priority,
      userId,
      planToFinishAt,
      actuallyFinishedAt,
    } = this.taskDialogData;

    this._isCreating = !id;

    this.taskForm = this.fb.group({
      title: [title || '', [Validators.required]],
      description: [description || ''],
      priority: [priority || TaskPriority.LOW, [Validators.required]],
      userId: [userId || null],
      // planToFinishAt: [planToFinishAt || new Date().toISOString()],
      // actuallyFinishedAt: [actuallyFinishedAt || ''],
    });

    this.loadParticipators();

  }

  loadParticipators(): void {
    const currentGroupId = this.groupService.currentGroup.id;
    this.groupService.findParticipatorsByGroupId(currentGroupId).subscribe({
      next: res => {
        this.participators = res.data;
      },
    });
  }

  handleSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    console.log(this.taskForm.value);

    const { id: groupId } = this.groupService.currentGroup;

    const {
      id,
      parentId,
    } = this.taskDialogData;

    const reqBody = this.isCreating ? _.assign(this.taskForm.value, { parentId, groupId }) : this.taskForm.value;
    const req$ = this.isCreating ? this.taskService.createOne(reqBody) : this.taskService.updateOneById(id, reqBody);

    req$.subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open('操作成功', 'OK', { duration: 1500 });
        // `false` indicates that the parent component should update data
        this.dialogRef.close(true);
      },
    });
  }

  handleCancel(): void {
    // `false` indicates that the parent component should not update data
    this.dialogRef.close(false);
  }

  get isCreating() {
    return this._isCreating;
  }

  get titleControl() {
    return this.taskForm.get('title');
  }

  get descriptionControl() {
    return this.taskForm.get('description');
  }

  get priorityControl() {
    return this.taskForm.get('priority');
  }

}

