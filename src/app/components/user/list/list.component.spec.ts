import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user.type';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ListComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
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

  it('call onDelete', () =>  {
    const service = TestBed.inject(UserService);
    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      email: 'test',
      nickname: 'test',
      age: 0
    };

    component.selectedUser = user;
    spyOn(service, 'deleteUser').and.returnValue(of(user));
    component.onDelete();

    expect(component.selectedUser).toEqual(user);
    expect(service.deleteUser).toHaveBeenCalled();
  });
});
