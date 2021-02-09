import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ModalService } from '../../../services/modal/modal.service';
import { AlertComponent } from '../../../modal/alert/alert.component';

@Component({
  selector: 'app-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  isLoading!: boolean;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) { }

  onCreate(formValue: any): void {
    console.log(formValue);
    this.isLoading = true;
    this.userService.createUser(formValue).subscribe(
      () => {
        this.isLoading = false;
        this.modalService.open(AlertComponent, {
          title: 'Success',
          subtitle: 'User created successfully',
          type: 'success'
        }).subscribe();
      }
    );
  }
}
