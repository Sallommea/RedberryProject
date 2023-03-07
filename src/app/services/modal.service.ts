import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals: ModalModel[] = [];

  constructor() {}

  isModalOpen(id: string): boolean {
    return !!this.modals.find((x) => x.id === id)?.visible;
  }

  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  toggleModal(id: string) {
    const modal = this.modals.find((x) => x.id == id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }
}

interface ModalModel {
  id: string;
  visible: boolean;
}
