import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user.type';
import { ModalService } from '../../../services/modal/modal.service';
import { AlertComponent } from '../../../modal/alert/alert.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isLoading!: boolean;
  selectedUser!: User;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.selectedUser = this.userService.selectedUser;
  }

  onUpdate(formValue: any): void {
    const data = {
      ...this.selectedUser,
      ...formValue
    };

    console.log(data);
    this.userService.updateUser(data).subscribe(
      () => {
        this.isLoading = false;
        this.modalService.openModal(AlertComponent, {
          title: 'Success',
          subtitle: 'User updated successfully',
          type: 'success'
        }).subscribe();
      }
    );
  }
}
