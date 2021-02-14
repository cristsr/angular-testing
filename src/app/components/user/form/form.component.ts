import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() btnTitle!: string;
  @Input() isLoading!: boolean;
  @Input() resetOnSubmit!: boolean;
  @Input() value!: User;
  @Output() formValue = new EventEmitter();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    age: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  validateControl(control: AbstractControl | null): boolean {
    if (!control) {
      throw new TypeError(`Control given not exist`);
    }
    return control.invalid && (control.dirty || control.touched);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value?.currentValue) {
      console.log('form value passed');
      Object.entries(this.value).forEach(([key, value]) => {
        this.form.get(key)?.setValue(value);
      });
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return;
    }

    this.formValue.emit(this.form.value);

    if (this.resetOnSubmit) {
      this.form.reset();
    }
  }

  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      'form .ng-invalid'
    );

    firstInvalidControl.focus();
  }
}
