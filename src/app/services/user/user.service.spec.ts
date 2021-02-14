import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../types/user.type';
import { switchMap, tap } from 'rxjs/operators';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call setSelectedUser ', () => {
    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setSelectedUser(user);
    expect(service.selectedUser).toEqual(user);
  });

  it('call users success', () => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(users));
    spyOn(service, 'fetchUsers').and.callThrough();
    spyOn(service, 'setUsers').and.callThrough();

    service.users.pipe(
      tap(() => expect(http.get).toHaveBeenCalled()),
      tap(() => expect(service.fetchUsers).toHaveBeenCalled()),
      tap(() => expect(service.setUsers).toHaveBeenCalled()),
      tap(data => expect(data).toEqual(users)),
    ).subscribe();
  });

  it('call users error', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(throwError('error'));
    spyOn(service, 'fetchUsers').and.callThrough();

    service.users.pipe(
      tap(() => expect(http.get).toHaveBeenCalled()),
      tap(() => expect(service.fetchUsers).toHaveBeenCalled()),
      tap(data => expect(data).toEqual([])),
    ).subscribe();
  });

  it('call createUser success', () => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    const user: User = {
      id: 1,
      name: 'new user',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(of(user));
    spyOn(service, 'setUsers').and.callThrough();

    service.createUser(user).pipe(
      tap(() => expect(http.post).toHaveBeenCalled()),
      tap(() => expect(service.setUsers).toHaveBeenCalled()),
      tap(data => expect(data.name).toEqual('new user')),
      switchMap(() => service.users),
      tap(data => expect(data).toEqual([...users, user]))
    ).subscribe();
  });

  it('call createUser error', () => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    const user: User = {
      id: 1,
      name: 'new user',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(throwError('error'));
    spyOn(service, 'setUsers').and.callThrough();

    service.createUser(user).subscribe({
      error: (err) => {
        expect(http.post).toHaveBeenCalled();
        expect(err).toEqual('error');
        expect(service.setUsers).not.toHaveBeenCalled();
        service.users.subscribe(data => expect(data).toEqual(users));
      }
    });
  });

  it('call updateUser success', () => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      },
      {
        id: 1,
        name: 'test 1',
        lastname: 'test 1',
        nickname: 'test 1',
        email: 'test1@test',
        age: 1
      }
    ];

    const user: User = {
      id: 0,
      name: 'test updated',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'put').and.returnValue(of(user));
    spyOn(service, 'setUsers').and.callThrough();

    service.updateUser(user).pipe(
      tap(() => expect(http.put).toHaveBeenCalled()),
      tap(() => expect(service.setUsers).toHaveBeenCalled()),
      tap(data => expect(data.name).toEqual(user.name)),
      switchMap(() => service.users),
      tap(data => expect(data).toEqual([user, users[1]]))
    ).subscribe();
  });

  it('call updateUser error', () => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    const user: User = {
      id: 0,
      name: 'test updated',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'put').and.returnValue(throwError('error'));
    spyOn(service, 'setUsers').and.callThrough();

    service.updateUser(user).subscribe({
      error: (err) => {
        expect(http.put).toHaveBeenCalled();
        expect(err).toEqual('error');
        expect(service.setUsers).not.toHaveBeenCalled();
        service.users.subscribe(data => expect(data).toEqual(users));
      }
    });
  });

  it('call deleteUser success', (done) => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    const user: User = {
      id: 0,
      name: 'test',
      lastname: 'test',
      nickname: 'test',
      email: 'test@test',
      age: 0
    };

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'delete').and.returnValue(of(user));
    spyOn(service, 'setUsers').and.callThrough();

    service.deleteUser(user.id as number).pipe(
      tap(() => expect(http.delete).toHaveBeenCalled()),
      tap(() => expect(service.setUsers).toHaveBeenCalled()),
      tap(data => expect(data.name).toEqual(user.name)),
      switchMap(() => service.users),
      tap(data => expect(data).toEqual([]))
    ).subscribe(() => done());
  }, 3000);

  it('call deleteUser error', (done) => {
    const users: User[] = [
      {
        id: 0,
        name: 'test',
        lastname: 'test',
        nickname: 'test',
        email: 'test@test',
        age: 0
      }
    ];

    service.setUsers(users);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'delete').and.returnValue(throwError('error'));

    service.deleteUser(0).subscribe({
      error: err => {
        expect(http.delete).toHaveBeenCalled();
        expect(err).toEqual('error');
        service.users
          .subscribe(data => expect(data).toEqual(users));
        done();
      }
    });
  }, 3000);

});
