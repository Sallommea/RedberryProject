import { Component, OnInit, Input } from '@angular/core';

import { AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() format: string = '';
  @Input() isRounded: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isSubmitAttempted: boolean = false;
  @Input() isLarge: boolean = false;
  @Input() logError: boolean = false;
  @Input() type: string = 'text';
  @Input() customErrorTextForPattern: string = '';
  @Input() disableAutocomplete = false;
  constructor() {}

  ngOnInit(): void {}

  hasInputErrors(): boolean {
    const control = this.control;

    if (this.isSubmitAttempted && this.control.errors != null) return true;
    else if (
      (this.control.dirty && this.control.errors != null) ||
      (this.control.touched && this.control.errors != null)
    )
      return true;
    return (
      control != null &&
      control.errors != null &&
      control.touched &&
      control.dirty
    );
  }
}
