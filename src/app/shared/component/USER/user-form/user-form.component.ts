import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/Iuser';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { UserService } from 'src/app/shared/service/userservice.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

 userForm!: FormGroup;
  userIdFormRoute!: string;
  userPatchObj!: Iuser;
  isInEditMode: boolean = false;

  constructor(
    private _activaedroute: ActivatedRoute,
    private _userService: UserService,
    private _snackbar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.onAddSkills();
    this.isAddSameHandler();
    this.sameAddressHandler();
    this.onPatchData();
  }
  sameAddressHandler() {
    this.c['isAddSame'].valueChanges.subscribe((val) => {
      let current = this.c['address'].get('current')?.value;
      if (val) {
        this.c['address'].get('permanent')?.patchValue(current);
      } else {
        if (this.isInEditMode) {
          this.c['address']
            .get('permanent')
            ?.patchValue(this.userPatchObj.address.permanent);
        } else {
          this.c['address'].get('permanent')?.reset();
        }
      }
    });
  }

  isAddSameHandler() {
    this.c['address'].get('current')?.valueChanges.subscribe((value) => {
      if (this.c['address'].get('current')?.valid) {
        this.c['isAddSame'].enable();
      } else {
        this.c['isAddSame'].disable();
      }
    });
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(false, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      profileDescription: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({
        value: false,
        disabled: true,
      }),
      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl(null, [Validators.required]),
          zipCode: new FormControl(null, [Validators.required]),
        }),

        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl(null, [Validators.required]),
          zipCode: new FormControl(null, [Validators.required]),
        }),
      }),

      skills: new FormArray([]),
    });
  }

  get c() {
    return this.userForm.controls;
  }

  get skillsArr() {
    return this.userForm.get('skills') as FormArray;
  }

  onAddSkills() {
    let skillControl = new FormControl(null, [Validators.required]);
    this.skillsArr.push(skillControl);
  }

  onAddUser() {
    if (this.userForm.valid) {
      let NEW_OBJ: Iuser = {
        ...this.userForm.value,
        userId: Date.now().toString(),
      };
      this._userService.onAddUser(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onPatchData() {
    this.userIdFormRoute = this._activaedroute.snapshot.paramMap.get('userId')!;
    if (this.userIdFormRoute) {
      this.isInEditMode = true;
      this._userService.getUserById(this.userIdFormRoute).subscribe({
        next: (data) => {
          this.userPatchObj = data;
          console.log(this.userPatchObj.address.permanent);
          //  this.userForm.get('address.permanent')?.patchValue(this.userPatchObj.address.permanent);
          this.skillsArr.clear();
          this.userPatchObj.skills.forEach((s) => {
            let skillControl = new FormControl(s, [Validators.required]);
            this.skillsArr.push(skillControl);
          });
          this.userForm.patchValue(this.userPatchObj);
        },
      });
    }
  }

  onUpdateUser() {
    if (this.userForm.valid) {
      let UPDATED_OBJ: Iuser = {
        ...this.userForm.value,
        userId: this.userIdFormRoute,
      };
      this._userService.onUpdateUser(UPDATED_OBJ).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
