import { GroupService } from './../../group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IGroupDialogData } from '../../interfaces/group-dialog-data.interface';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  private _isCreating: boolean;

  groupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<GroupFormComponent, ShouldUpdateData>,
    private readonly snackBar: MatSnackBar,
    private readonly groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) private groupDialogData: IGroupDialogData,
    ) { }

  ngOnInit() {
    const {
      id,
      name,
    } = this.groupDialogData;
    this._isCreating = !id;


    this.groupForm = this.fb.group({
      name: [name || '', [Validators.required]],
    });
  }

  handleSubmit(): void {
    if (this.groupForm.invalid) {
      return;
    }

    const { id } = this.groupDialogData;

    const reqBody = this.groupForm.value;
    const req$ = this.isCreating ? this.groupService.createOne(reqBody) : this.groupService.updateOneById(id, reqBody);

    req$.subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open('操作成功', 'OK', { duration: 1500 });
        this.dialogRef.close(true);
      },
    });

  }

  handleCancel(): void {
    this.dialogRef.close(false);
  }

  get nameControl() {
    return this.groupForm.get('name');
  }

  get isCreating() {
    return this._isCreating;
  }

}
