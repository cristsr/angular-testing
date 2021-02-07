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
  users: Observable<User[]> = this.userService.users;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onDelete(): void {

  }
}
