import { ChooseDefaultGroupComponent } from './../../../group/components/choose-default-group/choose-default-group.component';
import { GroupService } from './../../../group/group.service';
import { Component } from '@angular/core';

import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly dialog: MatDialog,
    private authService: AuthService,
    private groupService: GroupService,
  ) {}

  get currentUser() {
    return this.authService.currentUser;
  }

  get currentGroup() {
    return this.groupService.currentGroup;
  }

  logout() {
    this.authService.logout();
  }

  chooseGroup() {
    this.dialog.open(ChooseDefaultGroupComponent);
  }
}
