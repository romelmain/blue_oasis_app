import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
})
export class LogoutComponent {
  constructor(private router: Router) {}

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  deleteToken() {
    this.visible = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guest_id');

    location.reload();
  }
}
