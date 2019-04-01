import { AuthService } from './../../../auth/auth.service';
import { GroupService } from './../../group.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../group.entity';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  ownGroups: Partial<Group>[] = [];
  participatedGroups: Partial<Group>[] = [];

  constructor(
    private readonly groupService: GroupService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadOwnGroups();
    this.loadParticipatedGroups();
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

}
