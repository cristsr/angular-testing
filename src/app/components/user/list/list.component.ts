import { Component, OnInit } from '@angular/core';
import { User } from '../../../types/user.type';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isChecked = false;
  selectedUser: User;
  users: Observable<User[]> = this.userService.users;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onCheck(user: any): void {
    this.isChecked = true;
    this.selectedUser = user;
  }

  onEdit(): void {
    this.userService.setSelectedUser(this.selectedUser);
  }

  onDelete(): void {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      () => alert('Eliminado con exito')
    );
  }
}
