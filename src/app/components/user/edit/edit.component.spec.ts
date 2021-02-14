import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { UserService } from '../../../services/user/user.service';
import { ModalService } from '../../../services/modal/modal.service';
import { of } from 'rxjs';
import { User } from '../../../types/user.type';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ EditComponent, FormComponent ],
      providers: [ UserService, ModalService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call onUpdate',  () => {
    const formData: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    const userService = TestBed.inject(UserService);
    const modalService = TestBed.inject(ModalService);
    spyOn(userService, 'updateUser').and.returnValue(of(formData));
    spyOn(modalService, 'open').and.returnValue(of({}));

    component.onUpdate(formData);
    expect(userService.updateUser).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalled();
  });
});
