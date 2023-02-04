import {
  Directive,
  Host,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
  type: string;
}
@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    let files: FileHandle[] = [];
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    const type = file.type;
    files.push({ file, url, type });

    if (validExtensions.includes(type)) {
      this.files.emit(files);
    }
  }
}
