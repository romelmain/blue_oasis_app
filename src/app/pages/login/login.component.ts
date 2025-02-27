import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  status: string;
  token: string;
  constructor(private router: Router, public loginService: LoginService) {
    this.status = 'false';
    this.token = '';
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
        this.token = data.jwt;
        this.saveToken();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  saveToken() {
    localStorage.setItem('token', this.token);
    this.router.navigate(['']);
  }
}
