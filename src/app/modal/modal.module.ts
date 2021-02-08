import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { AlertComponent } from './alert/alert.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ModalComponent,
    AlertComponent,
    FormComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
