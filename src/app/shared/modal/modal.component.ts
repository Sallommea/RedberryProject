import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit(): void {
    this.el.nativeElement.remove();

    document.body.appendChild(this.el.nativeElement);
  }

  onMainPage() {
    this.router.navigate(['./']);
  }

  onList() {
    this.router.navigate(['list']);
  }
  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }
}
