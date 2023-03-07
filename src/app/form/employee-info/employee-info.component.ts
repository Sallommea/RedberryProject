import { Component, OnInit, OnDestroy } from '@angular/core';
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
  isSubmitAttempted: boolean = false;
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
        this.georgianNum,
      ]),
    });
  }

  nextPage() {
    this.isSubmitAttempted = true;

    if (this.employeeInfoForm.invalid) {
      return;
    }

    this.generalsService.formsubmitted.emit(true);

    this.router.navigate(['/forms/laptop'], {
      queryParams: { data: JSON.stringify(this.employeeInfoForm.value) },
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
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
      (control.value.length !== 13 || beginning != control.value.slice(0, 5))
    ) {
      return { georgianNum: true };
    }
    return null;
  }
}
