import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileHandle } from '../drag-and-drop.directive';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GeneralsService } from 'src/app/services/generals.service';
import { Brands, CPUs } from 'src/app/models/team.model';
import { Subscription } from 'rxjs';
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

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private generalsService: GeneralsService
  ) {}

  ngOnInit(): void {
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
    } else {
      console.log('hello');
    }
    const size = file.size / 1000000;
    this.imageSize = size.toFixed(1) + ' gb';
    this.imageName = file.name;
    this.showbutton = false;
  }

  previousPage() {
    this.router.navigateByUrl(`forms`);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
