import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
})
export class LogoutComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.visible = false;
  }
}
