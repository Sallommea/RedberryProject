import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormComponent } from './form/form.component';
import { EmployeeInfoComponent } from './form/employee-info/employee-info.component';
import { LaptopInfoComponent } from './form/laptop-info/laptop-info.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DragAndDropDirective } from './form/drag-and-drop.directive';
import { NgxMaskModule } from 'ngx-mask';

import { IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EmployeeInfoComponent,
    LaptopInfoComponent,
    HomeComponent,
    DragAndDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
