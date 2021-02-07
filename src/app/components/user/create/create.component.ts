import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  isLoading!: boolean;

  constructor(public userService: UserService) { }

  onCreate(formValue: any): void {
    console.log(formValue);
    this.isLoading = true;
    this.userService.createUser(formValue).subscribe(
      () => {
        this.isLoading = false;
      }
    );
  }
}
