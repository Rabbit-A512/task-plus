import { GroupFormComponent } from './../group-form/group-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IGroupDialogData } from './../../interfaces/group-dialog-data.interface';
import { AuthService } from './../../../auth/auth.service';
import { GroupService } from './../../group.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../group.entity';
import { DrawerDialogConfig } from 'src/app/shared/constants';
import { EntityId } from 'src/app/shared/interfaces/entity-service.interface';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  ownGroups: Partial<Group>[] = [];
  ownGroupsColumnsToDisplay = ['id', 'name', 'createdAt', 'operations'];

  participatedGroups: Partial<Group>[] = [];
  participatedGroupsColumnsToDisplay = ['id', 'name', 'createdAt'];

  constructor(
    private readonly groupService: GroupService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadAllGroups();
  }

  loadOwnGroups(): void {
    const userId = this.authService.currentUser.id;
    this.groupService.findOwnedGroupsByUserId(userId).subscribe({
      next: (res) => {
        this.ownGroups = res.data;
      },
    });
  }

  loadParticipatedGroups(): void {
    const userId = this.authService.currentUser.id;
    this.groupService.findParticipatedGroupsByUserId(userId).subscribe({
      next: (res) => {
        this.participatedGroups = res.data;
      },
    });
  }

  loadAllGroups(): void {
    this.loadOwnGroups();
    this.loadParticipatedGroups();
  }

  handleEditGroup(group: IGroupDialogData) {
    const dialogRef: MatDialogRef<GroupFormComponent, ShouldUpdateData> = this.dialog.open(GroupFormComponent, {
      ...DrawerDialogConfig,
      data: group,
    });

    dialogRef.afterClosed().subscribe({
      next: shouldUpdateData => {
        if (shouldUpdateData) {
          this.loadAllGroups();
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
          this.loadAllGroups();
        }
      }
    });
  }

}
