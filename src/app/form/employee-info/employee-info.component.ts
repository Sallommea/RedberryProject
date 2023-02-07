import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
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
  @Output() next = new EventEmitter();

  constructor(
    private router: Router,
    private generalsService: GeneralsService
  ) {}

  teams: User[] = [];
  positions: Position[] = [];
  subs: Subscription[] = [];
  firstNameValid = true;
  lastNameValid = true;
  teamsValid = true;
  positionsValid = true;
  emailValid = true;
  phoneNumValid = true;

  ngOnInit(): void {
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

  employeeInfoForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      this.onlyGeorgianLetters,
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      this.onlyGeorgianLetters,
    ]),
    team: new FormControl(null, [Validators.required]),
    position: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, this.emailRedberry]),
    phoneNum: new FormControl(null, [Validators.required, this.georgianNum]),
  });

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
    // if (this.employeeInfoForm.invalid) {
    //   return;
    // }

    console.log(this.employeeInfoForm);
    console.log(this.firstName.status);

    this.router.navigate(['/forms/laptop'], {
      state: { data: 'some data' },
    });
  }
  onSubmit() {
    console.log(this.employeeInfoForm.value.team);
  }

  // turning validators true when typing starts

  turnValidFirstName(event: Event) {
    this.firstNameValid = true;
  }
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

  // getting formgroup controls

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
