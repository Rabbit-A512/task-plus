import { ChooseDefaultGroupComponent } from './../../group/components/choose-default-group/choose-default-group.component';
import { MatDialog } from '@angular/material';
import { GroupService } from './../../group/group.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasCurrentGroupGuard implements CanActivate {

  constructor(
    private readonly groupService: GroupService,
    private readonly dialog: MatDialog,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.groupService.currentGroup) {
      return true;
    }

    const dialogRef = this.dialog.open(ChooseDefaultGroupComponent, {
      disableClose: true,
    });
    return dialogRef.afterClosed(); // <-- Observable<boolean>

  }
}
