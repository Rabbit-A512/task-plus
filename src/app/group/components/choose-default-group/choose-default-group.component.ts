import { UserService } from './../../../user/user.service';
import { MatDialogRef } from '@angular/material';
import { AuthService } from './../../../auth/auth.service';
import { GroupService } from './../../group.service';
import { Component, OnInit } from '@angular/core';

import { Group } from './../../group.entity';

@Component({
  selector: 'app-choose-default-group',
  templateUrl: './choose-default-group.component.html',
  styleUrls: ['./choose-default-group.component.scss']
})
export class ChooseDefaultGroupComponent implements OnInit {

  participatedGroups: Group[];

  participatedGroupsColumnsToDisplay = ['id', 'name', 'createdAt'];

  constructor(
    private readonly groupService: GroupService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly dialogRef: MatDialogRef<ChooseDefaultGroupComponent, boolean>,
  ) { }

  ngOnInit() {
    this.loadParticipatedGroups();
  }

  loadParticipatedGroups(): void {
    const userId = this.authService.currentUser.id;
    this.groupService.findParticipatedGroupsByUserId(userId).subscribe({
      next: res => {
        this.participatedGroups = res.data;
      },
    });
  }

  handleChooseGroup(group: Group) {
    const userId = this.authService.currentUser.id;
    // update user -> set up current group -> close the dialog
    this.userService.updateOneById(userId, { defaultGroupId: group.id }).subscribe({
      next: res => {
        // FIXME: remove log
        console.log(res);
        this.groupService.setUpDefaultGroup();
        this.dialogRef.close(true);
      }
    });

  }

  handleConfirm() {
    this.dialogRef.close(true);
  }

  handlleCancel() {
    this.dialogRef.close(false);
  }

  get currentGroup() {
    return this.groupService.currentGroup;
  }

}
