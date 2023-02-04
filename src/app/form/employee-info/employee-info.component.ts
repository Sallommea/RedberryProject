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
    // this.router.navigateByUrl(`forms/laptop`);

    if (this.firstName.invalid) {
      this.firstNameValid = false;
      return;
    }
    console.log(this.employeeInfoForm.status);
    console.log(this.employeeInfoForm);
    console.log(this.firstName.status);
  }
  onSubmit() {
    console.log('salome');
  }
  turntrue(event: Event) {
    this.firstNameValid = true;
  }
  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }

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
