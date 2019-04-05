import { ChooseDefaultGroupComponent } from './../../../group/components/choose-default-group/choose-default-group.component';
import { GroupService } from './../../../group/group.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupService: GroupService,
  ) { }

  ngOnInit() {
    // check whether the user has a current group
    // if (!this.groupService.currentGroup) {
    //   // FIXME: remove log
    //   console.log(1);
    //   const dialogRef: MatDialogRef<ChooseDefaultGroupComponent, boolean> = this.dialog.open(ChooseDefaultGroupComponent, {
    //     disableClose: true, // <-- cannot access tasks component without a current group being set
    //   });
    // }

  }

}
