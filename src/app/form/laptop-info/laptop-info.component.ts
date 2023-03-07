import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FileHandle } from '../drag-and-drop.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralsService } from 'src/app/services/generals.service';
import { Brands, CPUs } from 'src/app/models/team.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAllInfo, ownerInfo } from 'src/app/models/form.model';
import { LaptopsService } from 'src/app/services/laptops.service';

@Component({
  selector: 'app-laptop-info',
  templateUrl: './laptop-info.component.html',
  styleUrls: ['./laptop-info.component.css'],
})
export class LaptopInfoComponent implements OnInit, OnDestroy {
  files: FileHandle[] = [];
  showbutton = true;
  imageName: string;
  imageSize: string;
  employeeInfo: ownerInfo;
  token: string = '4b96756c57dd7a9d6aa75f70aa312e31';
  brands: Brands[] = [];
  cpus: CPUs[] = [];
  subs: Subscription[] = [];
  laptopInfoForm: FormGroup;
  isSubmitAttempted: boolean = false;
  laptopImageValid = true;
  showModal = false;
  data: any;
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private generalsService: GeneralsService,
    private route: ActivatedRoute
  ) {
    this.subs.push(
      this.generalsService.goback.subscribe(() => {
        this.previousPage();
      })
    );
  }

  ngOnInit(): void {
    const data = JSON.parse(this.route.snapshot.queryParamMap.get('data'));
    this.employeeInfo = data;
    this.data = JSON.parse(sessionStorage.getItem('myData'));
    this.updateData();

    this.subs.push(
      this.generalsService.getAllBrands().subscribe((res) => {
        this.brands = res;
      })
    );

    this.subs.push(
      this.generalsService.getAllCPUs().subscribe((res) => {
        this.cpus = res;
      })
    );
    this.subs.push(
      this.generalsService.goToMain.subscribe(() => {
        sessionStorage.clear();
      })
    );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.previousPage();
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    const file = files[0].file;
    const size = file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = file.name;
    this.laptopImageValid = true;
    this.showbutton = false;
  }

  onChange(event: any) {
    this.files = [];
    const files = event.target.files;
    const file = files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    console.log(url);
    const type = file.type;
    this.files.push({ file, url, type });

    const size = file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = file.name;
    this.showbutton = false;
    this.laptopImageValid = true;
  }

  updateData() {
    this.laptopInfoForm = new FormGroup({
      laptopName: new FormControl(this.data?.name, [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9!@#$%^&*()_+=]+$'),
      ]),
      laptopImage: new FormControl('', [Validators.required]),
      laptopBrandId: new FormControl(this.data?.brandId, [Validators.required]),
      laptopCPU: new FormControl(this.data?.cpu, [Validators.required]),
      laptopCPUCores: new FormControl(this.data?.cpuCores, [
        Validators.required,
      ]),
      LaptopCpuThreads: new FormControl(this.data?.cpuThreads, [
        Validators.required,
      ]),
      LaptopRam: new FormControl(this.data?.ram, [Validators.required]),
      LaptopHardDriveType: new FormControl(this.data?.hardDrive, [
        Validators.required,
      ]),
      LaptopState: new FormControl(this.data?.state, [Validators.required]),
      LaptopPurchaseDate: new FormControl(this.data?.date),
      LaptopPrice: new FormControl(this.data?.price, [Validators.required]),
    });
  }

  previousPage() {
    this.generalsService.formsubmitted.emit(false);
    let myObj = {
      name: this.laptopInfoForm.controls.laptopName.value,
      brandId: this.laptopInfoForm.controls.laptopBrandId.value,
      cpu: this.laptopInfoForm.controls.laptopCPU.value,
      cpuCores: this.laptopInfoForm.controls.laptopCPUCores.value,
      cpuThreads: this.laptopInfoForm.controls.LaptopCpuThreads.value,
      ram: this.laptopInfoForm.controls.LaptopRam.value,
      hardDrive: this.laptopInfoForm.controls.LaptopHardDriveType.value,
      state: this.laptopInfoForm.controls.LaptopState.value,
      date: this.laptopInfoForm.controls.LaptopPurchaseDate.value,
      price: this.laptopInfoForm.controls.LaptopPrice.value,
    };
    console.log(myObj);
    sessionStorage.setItem('myData', JSON.stringify(myObj));
    this.router.navigate(['forms'], {
      state: {
        data: {
          info: this.employeeInfo,
        },
      },
    });
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    this.isSubmitAttempted = true;

    if (this.laptopInfoForm.controls.laptopImage.invalid) {
      this.laptopImageValid = false;
    }

    if (this.laptopInfoForm.invalid || !this.laptopImageValid) {
      return;
    }

    // this.showModal = true;

    // const formAllInfo: FormAllInfo = {
    //   name: this.employeeInfo.firstName,
    //   surname: this.employeeInfo.lastName,
    //   team_id: this.employeeInfo.team,
    //   position_id: this.employeeInfo.position,
    //   phone_number: this.employeeInfo.phoneNum,
    //   email: this.employeeInfo.email,
    //   token: this.token,
    //   laptop_name: this.laptopInfoForm.value.laptopName,
    //   laptop_image: '',
    //   laptop_brand_id: this.laptopInfoForm.value.laptopBrandId,
    //   laptop_cpu: this.laptopInfoForm.value.laptopCPU,
    //   laptop_cpu_cores: this.laptopInfoForm.value.laptopCPUCores,
    //   laptop_cpu_threads: this.laptopInfoForm.value.LaptopCpuThreads,
    //   laptop_ram: this.laptopInfoForm.value.LaptopRam,
    //   laptop_hard_drive_type: this.laptopInfoForm.value.LaptopHardDriveType,
    //   laptop_state: this.laptopInfoForm.value.LaptopState,
    //   laptop_purchase_date: this.laptopInfoForm.value.LaptopPurchaseDate,
    //   laptop_price: this.laptopInfoForm.value.LaptopPrice,
    // };

    // this.laptopService.addLaptop(formAllInfo).subscribe((res) => {});

    sessionStorage.clear();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
