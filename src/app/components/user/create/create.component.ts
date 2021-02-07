import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLoading: boolean;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    age: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {}

  onCreate(): void {
    console.log(this.form.value);
    this.isLoading = true;
    this.userService.createUser(this.form.value).subscribe(
      () => {
        this.isLoading = false;
      }
    );
  }
}
