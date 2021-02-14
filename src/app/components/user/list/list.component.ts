import { Component, OnInit } from '@angular/core';
import { User } from '../../../types/user.type';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { PromptComponent } from '../../../modal/prompt/prompt.component';
import { AlertComponent } from '../../../modal/alert/alert.component';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoading: boolean;
  isChecked = false;
  selectedUser!: User;
  users: Observable<User[]> = this.userService.users;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
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
    this.isLoading = true;
    const confirmModalConfig = {
      title: 'Delete user',
      subtitle: 'Are you sure you want to delete this user?',
    };

    const alertModalConfigSuccess = {
      title: 'User deleted',
      subtitle: 'User deleted successfully!',
      type: 'success'
    };

    const alertModalConfigError = {
      title: 'Error!',
      subtitle: 'An error occurred while processing your request',
      type: 'error'
    };

    this.modalService.open(PromptComponent, confirmModalConfig).pipe(
      filter(action => {
        if (!action.confirm) {
          this.isLoading = false;
          this.isChecked = false;
        }
        return action.confirm;
      }),
      switchMap(() => this.userService.deleteUser(this.selectedUser.id)),
    ).subscribe(
      () => {
        this.modalService.open(AlertComponent, alertModalConfigSuccess);
        this.isLoading = false;
        this.isChecked = false;
      },
      () => {
        this.modalService.open(AlertComponent, alertModalConfigError);
        this.isLoading = false;
        this.isChecked = false;
      }
    );
  }
}
