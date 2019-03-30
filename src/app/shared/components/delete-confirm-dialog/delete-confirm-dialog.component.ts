import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent, boolean>,
  ) { }

  ngOnInit() {
  }

  handleConfirm() {
    this.dialogRef.close(true);
  }

  handlleCancel() {
    this.dialogRef.close();
  }

}
