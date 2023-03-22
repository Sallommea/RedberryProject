import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-on-main-page',
  templateUrl: './on-main-page.component.html',
  styleUrls: ['./on-main-page.component.css'],
})
export class OnMainPageComponent implements OnInit {
  @Output() onMainPage = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onClick() {
    this.onMainPage.emit();
  }
}
