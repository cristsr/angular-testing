import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { User } from '../../types/user.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRepository = new BehaviorSubject<User[]>([]);
  private selectedUser: User;

  constructor(private http: HttpClient) { }

  setSelectedUser(user: User): void {
    this.selectedUser = user;
  }

  get users(): Observable<User[]> {
    if (!this.userRepository.value.length) {
      this.fetchUsers();
    }

    return this.userRepository.asObservable();
  }

  fetchUsers(): void {
    const url = environment.apiUrl + '/users';
    this.http.get<User[]>(url).pipe(
      filter(user => Array.isArray(user)),
      catchError(() => EMPTY),
      tap(users => this.userRepository.next(users))
    ).subscribe();
  }

  createUser(user: User): Observable<any> {
    const url = environment.apiUrl + '/users';
    return this.http.post<User>(url, user).pipe(
      tap(res => this.userRepository.next([
        ...this.userRepository.value, res
      ]))
    );
  }

  updateUser(user: any): Observable<any> {
    const url = environment.apiUrl + '/users';
    return this.http.put<User>(url, user).pipe(
      tap(res => this.userRepository.next(
        this.userRepository.value.map(
          v => v.id === res.id ? res : v
        )
      )),
    );
  }

  deleteUser(userId: any): Observable<any> {
    const url = environment.apiUrl + '/users';
    return this.http.delete<User>(url).pipe(
      tap(res => this.userRepository.next(
        this.userRepository.value.filter(
          v => v.id !== res.id
        )
      )),
    );
  }
}
