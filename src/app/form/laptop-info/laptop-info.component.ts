import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileHandle } from '../drag-and-drop.directive';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GeneralsService } from 'src/app/services/generals.service';
import { Brands, CPUs } from 'src/app/models/team.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import {} from '@angular/router';

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
  brands: Brands[] = [];
  cpus: CPUs[] = [];
  subs: Subscription[] = [];
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

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private generalsService: GeneralsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      // const data = this.activatedRoute.snapshot.data.state.data;
      // console.log(data);
      // const data2 = this.router.getCurrentNavigation().extras.state.data;
      // console.log(data2);
    });

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
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    console.log(files[0].file);
    this.laptopImageValid = true;
    this.showbutton = false;

    const size = files[0].file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = files[0].file.name;
    console.log(this.imageName, this.imageSize);
  }

  onChange(img: File[]) {
    this.files = [];
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = img[0];

    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    const type = file.type;

    if (validExtensions.includes(type)) {
      this.files.push({ file, url, type });
    }

    const size = file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = file.name;
    this.showbutton = false;
    this.laptopImageValid = true;
  }

  laptopInfoForm: FormGroup = new FormGroup({
    laptopName: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9!@#$%^&*()_+=]+$'),
    ]),
    laptopImage: new FormControl(null, [Validators.required]),
    laptopBrandId: new FormControl(null, [Validators.required]),
    laptopCPU: new FormControl(null, [Validators.required]),
    laptopCPUCores: new FormControl(null, [Validators.required]),
    LaptopCpuThreads: new FormControl(null, [Validators.required]),
    LaptopRam: new FormControl(null, [Validators.required]),
    LaptopHardDriveType: new FormControl(null, [Validators.required]),
    LaptopState: new FormControl(null, [Validators.required]),
    LaptopPurchaseDate: new FormControl(null),
    LaptopPrice: new FormControl(null, [Validators.required]),
  });

  previousPage() {
    this.router.navigateByUrl(`forms`);
  }
  onSubmit() {
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
    if (this.laptopInfoForm.invalid) {
      return;
    }

    console.log(this.laptopInfoForm);
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
