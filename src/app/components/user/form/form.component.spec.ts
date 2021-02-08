import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { SimpleChange } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.btnTitle = 'test';
    component.resetOnSubmit = true;
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('form field validation', () => {
    expect(component.name.valid).toBeFalsy();
    component.name.setValue('test');
    expect(component.name.valid).toBeTruthy();
  });

  it('form is valid', () => {
    component.form.setValue({
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0,
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('call onSave valid form', () => {
    const formData = {
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0,
    };

    component.form.setValue(formData);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(formData);

    component.formValue.pipe(
      tap(value => expect(value).toEqual(formData))
    ).subscribe();

    component.onSave();
  });

  it('call onSave invalid form',  () => {
    spyOn(component, 'scrollToFirstInvalidControl').and.returnValue(undefined);
    component.onSave();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.touched).toBeTruthy();
    expect(component.scrollToFirstInvalidControl).toHaveBeenCalled();
  });

  it('call ngOnChanges', () => {
    const formData = {
      id: 0,
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0,
    };

    component.value = formData;
    component.ngOnChanges({
      value: new SimpleChange(null , formData, true)
    });
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value.name).toEqual(formData.name);
  });

  it('call scrollToFirstInvalidControl ', () => {
    component.scrollToFirstInvalidControl();
    expect(component.form.valid).toBeFalsy();
  });
});
