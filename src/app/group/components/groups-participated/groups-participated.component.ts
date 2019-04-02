import { Group } from './../../group.entity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groups-participated',
  templateUrl: './groups-participated.component.html',
  styleUrls: ['./groups-participated.component.scss']
})
export class GroupsParticipatedComponent implements OnInit {
  @Input() participatedGroups: Partial<Group>[];

  participatedGroupsColumnsToDisplay = ['id', 'name', 'createdAt'];

  constructor() { }

  ngOnInit() {
  }

}
