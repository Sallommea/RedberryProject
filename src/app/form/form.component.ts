import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralsService } from '../services/generals.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  activated = false;
  constructor(private generalsService: GeneralsService, private route: Router) {
    this.generalsService.formsubmitted.subscribe((status: boolean) => {
      this.activated = status;
    });
  }

  ngOnInit(): void {
    if (this.route.url.slice(0, 10) === '/forms/lap') {
      this.activated = true;
    }
  }

  nextpage() {
    this.generalsService.employeeinfosubmitted.emit();
  }
  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
  previous() {
    this.activated = false;
    this.generalsService.goback.emit();
  }
  mainPage() {
    this.generalsService.goToMain.emit();
  }
}
