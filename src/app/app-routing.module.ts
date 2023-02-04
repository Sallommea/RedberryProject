import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInfoComponent } from './form/employee-info/employee-info.component';
import { FormComponent } from './form/form.component';
import { LaptopInfoComponent } from './form/laptop-info/laptop-info.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'forms',
    component: FormComponent,
    children: [
      { path: '', component: EmployeeInfoComponent },
      { path: 'laptop', component: LaptopInfoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
