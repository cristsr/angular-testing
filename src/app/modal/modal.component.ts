import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  template: `<ng-container #container></ng-container>`,
})
export class ModalComponent implements AfterViewInit  {

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(
    private modalService: ModalService,
  ) { }

  ngAfterViewInit(): void {
    this.modalService.setContainer(this.container);
  }
}
