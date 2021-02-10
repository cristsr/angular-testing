import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, filter, switchMap, tap } from 'rxjs/operators';
import { User } from '../../types/user.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public selectedUser!: User;
  private userRepository = new BehaviorSubject<User[]>([]);

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

  createUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/users';
    return this.http.post<User>(url, user).pipe(
      tap(res => this.userRepository.next([
        ...this.userRepository.value, res
      ]))
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.apiUrl}/users/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      tap(res => this.userRepository.next(
        this.userRepository.value.map(
          v => v.id === res.id ? res : v
        )
      )),
    );
  }

  deleteUser(userId: any): Observable<User> {
    const url = `${environment.apiUrl}/users/${userId}`;

    return of(null).pipe(delay(5000), switchMap(
      () => this.http.delete<User>(url).pipe(
          tap(() => this.userRepository.next(
            this.userRepository.value.filter(
              v => v.id !== userId
            )
          )),
        )
    ));
  }
}
