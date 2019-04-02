import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  DeleteConfirmDialogComponent,
} from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DrawerDialogConfig } from 'src/app/shared/constants';
import { EntityId } from 'src/app/shared/interfaces/entity-service.interface';

import { Group } from '../../group.entity';
import { IGroupDialogData } from '../../interfaces/group-dialog-data.interface';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupService } from './../../group.service';

@Component({
  selector: 'app-groups-owned',
  templateUrl: './groups-owned.component.html',
  styleUrls: ['./groups-owned.component.scss']
})
export class GroupsOwnedComponent implements OnInit {

  @Input() ownGroups: Partial<Group>[];

  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();

  ownGroupsColumnsToDisplay = ['id', 'name', 'createdAt', 'operations'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupService: GroupService,
  ) { }

  ngOnInit() {
  }

  handleCreateGroup(): void {
    this.handleEditGroup({});
  }

  handleEditGroup(group?: IGroupDialogData) {
    const dialogRef: MatDialogRef<GroupFormComponent, ShouldUpdateData> = this.dialog.open(GroupFormComponent, {
      ...DrawerDialogConfig,
      data: group,
    });

    dialogRef.afterClosed().subscribe({
      next: shouldUpdateData => {
        if (shouldUpdateData) {
          this.updated.emit();
        }
      }
    });
  }

  handleDeleteGroup(groupId: EntityId): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap(confirmDelete => confirmDelete ? this.groupService.deleteOneById(groupId) : of(null)),
    ).subscribe({
      next: res => {
        if (res !== null) {
          this.deleted.emit();
        }
      }
    });
  }
}
