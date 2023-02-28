import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ButtonComponent, ModalComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, ModalComponent],
})
export class SharedModule {}
