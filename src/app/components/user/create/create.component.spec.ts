import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { UserService } from '../../../services/user/user.service';
import { ModalService } from '../../../services/modal/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ CreateComponent, FormComponent ],
      providers: [  UserService, ModalService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call onCreate',  () => {
    const formData = {
      id: 0,
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };
    const userService = TestBed.inject(UserService);
    const modalService = TestBed.inject(ModalService);
    spyOn(userService, 'createUser').and.returnValue(of(formData));
    spyOn(modalService, 'open').and.returnValue(of({}));

    component.onCreate(formData);
    expect(userService.createUser).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalled();
  });
});
