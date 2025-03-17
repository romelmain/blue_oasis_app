import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GuestService } from '../../services/guest.service';
import { NewGuestComponent } from '../../components/new-guest/new-guest.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NewGuestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  guest: boolean;
  status: string;
  user = localStorage.getItem('user');

  constructor(private guestService: GuestService) {
    this.status = '200';
    this.guest = false;
    this.user;
    if (this.user != null) {
      this.getGuestByUser(this.user);
    }
  }

  getGuestByUser(user: string) {
    this.guestService.getGuestByUser(user).subscribe({
      next: (data) => {
        //this.status = data.status;
        console.log('guest id ' + data.id);
        this.guest = true;
        localStorage.setItem('guest_id', data.id);
      },
      error: (e) => {
        this.status = e.status;
        console.log(e.status);
      },
    });
  }
}
