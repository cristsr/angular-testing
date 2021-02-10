import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user.type';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalService } from '../../../services/modal/modal.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ListComponent ],
      providers: [ UserService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('users intialization',  () => {
    const service = TestBed.inject(UserService);
    const users = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        email: 'test',
        nickname: 'test',
        age: 0
      }
    ];

    spyOnProperty(service, 'users').and.returnValue(of(users));
    component.ngOnInit();

    component.users.pipe(
      tap(response => expect(response).toBeInstanceOf(Array))
    ).subscribe();
  });

  it('call onCheck ', () => {
    expect(component.isChecked).toBeFalsy();
    expect(component.selectedUser).toBeFalsy();

    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };

    component.onCheck(user);

    expect(component.isChecked).toBeTruthy();
    expect(component.selectedUser).toEqual(user);
  });

  it('call onEdit', () =>  {
    const service = TestBed.inject(UserService);
    spyOn(service, 'setSelectedUser').and.returnValue(undefined);

    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };
    component.selectedUser = user;

    component.onEdit();

    expect(component.selectedUser).toEqual(user);
    expect(service.setSelectedUser).toHaveBeenCalled();
  });

  it('call onDelete successful', () =>  {
    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };

    const userService = TestBed.inject(UserService);
    const modalService = TestBed.inject(ModalService);

    spyOn(userService, 'deleteUser').and.returnValue(of(user));
    spyOn(modalService, 'open').and.returnValue(of({
      confirm: true
    }));

    component.selectedUser = user;
    component.onDelete();

    expect(component.selectedUser).toEqual(user);
    expect(userService.deleteUser).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('call onDelete decline', () =>  {
    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };

    const userService = TestBed.inject(UserService);
    const modalService = TestBed.inject(ModalService);

    spyOn(userService, 'deleteUser').and.returnValue(of(user));
    spyOn(modalService, 'open').and.returnValue(of({
      confirm: false
    }));

    component.selectedUser = user;
    component.onDelete();

    expect(component.selectedUser).toEqual(user);
    expect(userService.deleteUser).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('call onDelete error', () =>  {
    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };

    const userService = TestBed.inject(UserService);
    const modalService = TestBed.inject(ModalService);

    spyOn(userService, 'deleteUser').and.returnValue(throwError('error'));
    spyOn(modalService, 'open').and.returnValue(of({
      confirm: true
    }));

    component.selectedUser = user;
    component.onDelete();

    expect(component.selectedUser).toEqual(user);
    expect(userService.deleteUser).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalled();
  });
});
