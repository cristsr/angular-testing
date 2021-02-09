import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { AlertComponent } from './alert/alert.component';
import { FormComponent } from './form/form.component';
import { PromptComponent } from './prompt/prompt.component';


@NgModule({
  declarations: [
    ModalComponent,
    AlertComponent,
    FormComponent,
    PromptComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
