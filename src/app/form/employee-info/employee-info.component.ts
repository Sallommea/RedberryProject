import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Position, User } from '../../models/team.model';
import { GeneralsService } from 'src/app/services/generals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css'],
})
export class EmployeeInfoComponent implements OnInit, OnDestroy {
  teams: User[] = [];
  positions: Position[] = [];
  subs: Subscription[] = [];
  employeeInfoForm: FormGroup;
  firstNameValid = true;
  lastNameValid = true;
  teamsValid = true;
  positionsValid = true;
  emailValid = true;
  phoneNumValid = true;
  data: any;

  constructor(
    private router: Router,
    private generalsService: GeneralsService
  ) {
    this.data = this.router.getCurrentNavigation().extras.state?.data.info;
    this.subs.push(
      this.generalsService.employeeinfosubmitted.subscribe(() => {
        this.nextPage();
      })
    );
  }
  ngOnInit(): void {
    this.updateData();
    this.subs.push(
      this.generalsService.getAllTeams().subscribe((res) => {
        this.teams = res;
      })
    );

    this.subs.push(
      this.generalsService.getAllPositions().subscribe((res) => {
        this.positions = res;
      })
    );
  }

  updateData() {
    this.employeeInfoForm = new FormGroup({
      firstName: new FormControl(this.data?.firstName, [
        Validators.required,
        Validators.minLength(2),
        this.onlyGeorgianLetters,
      ]),
      lastName: new FormControl(this.data?.lastName, [
        Validators.required,
        Validators.minLength(2),
        this.onlyGeorgianLetters,
      ]),
      team: new FormControl(this.data?.team, [Validators.required]),
      position: new FormControl(this.data?.position, [Validators.required]),
      email: new FormControl(this.data?.email, [
        Validators.required,
        this.emailRedberry,
      ]),
      phoneNum: new FormControl(this.data?.phoneNum, [
        Validators.required,
        Validators.maxLength(13),
        this.georgianNum,
      ]),
    });
  }

  nextPage() {
    if (this.firstName.invalid) {
      this.firstNameValid = false;
    }
    if (this.lastName.invalid) {
      this.lastNameValid = false;
    }
    if (this.email.invalid) {
      this.emailValid = false;
    }
    if (this.phoneNum.invalid) {
      this.phoneNumValid = false;
    }
    if (this.team.invalid) {
      this.teamsValid = false;
    }
    if (this.position.invalid) {
      this.positionsValid = false;
    }
    if (this.employeeInfoForm.invalid) {
      return;
    }

    this.generalsService.formsubmitted.emit(true);

    this.router.navigate(['/forms/laptop'], {
      queryParams: { data: JSON.stringify(this.employeeInfoForm.value) },
    });
  }

  // turning validators true when typing starts

  turnValidFirstName(event: Event) {
    this.firstNameValid = true;
  }

  // name(event: Event) {
  // with change event
  //   console.log((event.target as HTMLInputElement).value);
  // }
  turnValidLastName() {
    this.lastNameValid = true;
  }

  turnValidEmail() {
    this.emailValid = true;
  }

  turnValidPhoneNum() {
    this.phoneNumValid = true;
  }

  turnValidTeam() {
    this.teamsValid = true;
  }
  turnValidPosition() {
    this.positionsValid = true;
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }

  // getting controls

  get firstName() {
    return this.employeeInfoForm.get('firstName');
  }

  get lastName() {
    return this.employeeInfoForm.get('lastName');
  }

  get team() {
    return this.employeeInfoForm.get('team');
  }

  get position() {
    return this.employeeInfoForm.get('position');
  }
  get email() {
    return this.employeeInfoForm.get('email');
  }

  get phoneNum() {
    return this.employeeInfoForm.get('phoneNum');
  }

  // custom validators

  onlyGeorgianLetters(control: FormControl) {
    const regex = new RegExp('[Ⴀ-\u10fe -. \u1c90-\u1cbf]+$');
    if (control.value != null && !regex.test(control.value)) {
      return { onlyGeorgianLetters: true };
    }
    return null;
  }

  emailRedberry(control: FormControl) {
    const email = '@redberry.ge';
    if (control.value != null && !(email === control.value.slice(-12))) {
      return { emailRedberry: true };
    }
    return null;
  }

  georgianNum(control: FormControl) {
    const beginning = '+9955';
    if (
      control.value != null &&
      control.value.length != 13 &&
      beginning != control.value.slice(0, 5)
    ) {
      return { georgianNum: true };
    }
    return null;
  }
}
