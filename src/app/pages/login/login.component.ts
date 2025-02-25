import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  status: boolean;
  constructor(public loginService: LoginService) {
    this.status = false;
    this.username = new FormControl('');
    this.password = new FormControl('');

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }
  postLogin() {
    console.log(this.loginForm.value);

    this.loginService.postLogin(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
