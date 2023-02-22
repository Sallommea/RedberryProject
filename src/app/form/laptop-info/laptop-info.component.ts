import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileHandle } from '../drag-and-drop.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralsService } from 'src/app/services/generals.service';
import { Brands, CPUs } from 'src/app/models/team.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAllInfo, ownerInfo } from 'src/app/models/form.model';

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
  binaryString: string;
  employeeInfo: ownerInfo;
  token: string = '4b96756c57dd7a9d6aa75f70aa312e31';
  brands: Brands[] = [];
  cpus: CPUs[] = [];
  subs: Subscription[] = [];
  laptopInfoForm: FormGroup;
  laptopNameValid = true;
  laptopImageValid = true;
  laptopBrandIdValid = true;
  laptopCpuValid = true;
  laptopCPUCoresValid = true;
  laptopCpuThreadsValid = true;
  laptopRamValid = true;
  laptopHardDriveValid = true;
  laptopStateValid = true;
  laptopPriceValid = true;
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

  filesDropped(files: FileHandle[]): void {
    this.files = files;

    const file = files[0].file;
    const size = file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = file.name;

    const reader = new FileReader();

    reader.onloadend = () => {
      this.binaryString = reader.result + '';
    };

    reader.readAsBinaryString(file);

    this.laptopImageValid = true;
    this.showbutton = false;
  }

  onChange(files: File[]) {
    this.files = [];
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = files[0];

    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    const type = file.type;

    if (validExtensions.includes(type)) {
      this.files.push({ file, url, type });
    } else {
      this.laptopImageValid = false;
      this.showbutton = true;
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.binaryString = reader.result + '';
      console.log(this.binaryString);
    };
    reader.readAsBinaryString(file);

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
      laptopImage: new FormControl(null, [Validators.required]),
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
    console.log(this.laptopName.value);
    let myObj = {
      name: this.laptopName.value,
      brandId: this.laptopBrandId.value,
      cpu: this.laptopCPU.value,
      cpuCores: this.laptopCPUCores.value,
      cpuThreads: this.LaptopCpuThreads.value,
      ram: this.LaptopRam.value,
      hardDrive: this.LaptopHardDriveType.value,
      state: this.LaptopState.value,
      date: this.LaptopPurchaseDate.value,
      price: this.LaptopPurchaseDate.value,
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

  onSubmit() {
    sessionStorage.clear();
    if (this.laptopName.invalid) {
      this.laptopNameValid = false;
    }
    if (this.laptopImage.invalid) {
      this.laptopImageValid = false;
    }
    if (this.laptopBrandId.invalid) {
      this.laptopBrandIdValid = false;
    }
    if (this.laptopCPU.invalid) {
      this.laptopCpuValid = false;
    }
    if (this.laptopCPUCores.invalid) {
      this.laptopCPUCoresValid = false;
    }
    if (this.LaptopCpuThreads.invalid) {
      this.laptopCpuThreadsValid = false;
    }
    if (this.LaptopRam.invalid) {
      this.laptopRamValid = false;
    }
    if (this.LaptopHardDriveType.invalid) {
      this.laptopHardDriveValid = false;
    }
    if (this.LaptopState.invalid) {
      this.laptopStateValid = false;
    }
    if (this.LaptopPrice.invalid) {
      this.laptopPriceValid = false;
    }
    console.log(this.laptopInfoForm);
    if (this.laptopInfoForm.invalid || !this.laptopImageValid) {
      return;
    }

    const formAllInfo: FormAllInfo = {
      name: this.employeeInfo.firstName,
      surname: this.employeeInfo.lastName,
      team_id: this.employeeInfo.team,
      position_id: this.employeeInfo.position,
      phone_number: this.employeeInfo.phoneNum,
      email: this.employeeInfo.email,
      token: this.token,
      laptop_name: this.laptopInfoForm.value.laptopName,
      laptop_image: this.binaryString,
      laptop_brend_id: this.laptopInfoForm.value.laptopBrandId,
      laptop_cpu: this.laptopInfoForm.value.laptopCPU,
      latpop_cpu_cores: this.laptopInfoForm.value.laptopCPUCores,
      latpop_cpu_threads: this.laptopInfoForm.value.LaptopCpuThreads,
      laptop_ram: this.laptopInfoForm.value.LaptopRam,
      laptop_hard_drive_type: this.laptopInfoForm.value.LaptopHardDriveType,
      laptop_state: this.laptopInfoForm.value.LaptopState,
      laptop_purchase_date: this.laptopInfoForm.value.LaptopPurchaseDate,
      laptop_price: this.laptopInfoForm.value.LaptopPrice,
    };
    console.log(formAllInfo);

    console.log(this.laptopInfoForm);
    sessionStorage.clear();
  }

  turnValidLaptopName() {
    this.laptopNameValid = true;
  }

  turnValidlaptopBrandId() {
    this.laptopBrandIdValid = true;
  }

  turnValidlaptopCpu() {
    this.laptopCpuValid = true;
  }

  turnValidlaptopCPUCores() {
    this.laptopCPUCoresValid = true;
  }

  turnValidlaptopCpuThreads() {
    this.laptopCpuThreadsValid = true;
  }

  turnValidLaptopRam() {
    this.laptopRamValid = true;
  }

  turnValidlaptopHardDrive() {
    this.laptopHardDriveValid = true;
  }

  turnValidLaptopState() {
    this.laptopStateValid = true;
  }

  turnValidlaptopPrice() {
    this.laptopPriceValid = true;
  }

  get laptopImage() {
    return this.laptopInfoForm.get('laptopImage');
  }

  get laptopCPU() {
    return this.laptopInfoForm.get('laptopCPU');
  }
  get laptopName() {
    return this.laptopInfoForm.get('laptopName');
  }
  get laptopBrandId() {
    return this.laptopInfoForm.get('laptopBrandId');
  }
  get laptopCPUCores() {
    return this.laptopInfoForm.get('laptopCPUCores');
  }
  get LaptopCpuThreads() {
    return this.laptopInfoForm.get('LaptopCpuThreads');
  }
  get LaptopRam() {
    return this.laptopInfoForm.get('LaptopRam');
  }
  get LaptopHardDriveType() {
    return this.laptopInfoForm.get('LaptopHardDriveType');
  }
  get LaptopState() {
    return this.laptopInfoForm.get('LaptopState');
  }
  get LaptopPurchaseDate() {
    return this.laptopInfoForm.get('LaptopPurchaseDate');
  }
  get LaptopPrice() {
    return this.laptopInfoForm.get('LaptopPrice');
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
