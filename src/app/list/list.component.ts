import { Component, OnDestroy, OnInit } from '@angular/core';
import { LaptopsService } from '../services/laptops.service';
import { Subscription } from 'rxjs';
import { Data } from '../models/form.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  laptops: Data[] = [];
  constructor(private laptopService: LaptopsService) {}

  ngOnInit(): void {
    this.subs.push(
      this.laptopService.getAllLaptops().subscribe((res) => {
        this.laptops = res;
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
