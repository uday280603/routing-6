import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/Iuser';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { UserService } from 'src/app/shared/service/userservice.service';
import { GetConfirmComponent } from '../../HOME/get-confirm/get-confirm.component';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId!: string;
  getUserObj!: Iuser;

  constructor(
    private _activedRoute: ActivatedRoute,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _snackbar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserbyId();
  }

  getUserbyId() {
    this._activedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('userId')!;
      this._userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.getUserObj = data;
        },
      });
    });
  }
  onRemove() {
    let matConfig = new MatDialogConfig();
    matConfig.disableClose = true;
    matConfig.width = '400px';
    matConfig.data = `Are you sure to remove the user with id ${this.userId}..?`;
    let _marRef = this._matDialog.open(GetConfirmComponent, matConfig);
    _marRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this._userService.removeUser(this.userId).subscribe({
          next: (data) => {
            this._snackbar.opensnackbar(data.msg);
            this._router.navigate(['users']);
          },
        });
      }
    });
  }
}
