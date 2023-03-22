import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { OnMainPageComponent } from './on-main-page/on-main-page.component';
@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    InputComponent,
    OnMainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    InputComponent,
    OnMainPageComponent,
  ],
})
export class SharedModule {}
