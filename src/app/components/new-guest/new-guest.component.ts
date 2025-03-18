import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import Guest from '../../models/Guest';

@Component({
  selector: 'app-new-guest',
  imports: [ReactiveFormsModule],
  templateUrl: './new-guest.component.html',
  styleUrl: './new-guest.component.css',
})
export class NewGuestComponent {
  newGuestForm: FormGroup;
  name: FormControl;
  lastname: FormControl;
  phone: FormControl;
  address: FormControl;
  username = localStorage.getItem('user');

  constructor(private router: Router, public guestService: GuestService) {
    this.name = new FormControl('');
    this.lastname = new FormControl('');
    this.phone = new FormControl('');
    this.address = new FormControl('');

    this.newGuestForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      phone: this.phone,
      address: this.address,
    });
  }

  postGuest() {
    console.log(this.newGuestForm.value);
    let newGuest = this.newGuestForm.value;
    newGuest.username = this.username;
    console.log('TOKEN');
    console.log(localStorage.getItem('token'));
    console.log(newGuest);

    this.guestService.postGuest(newGuest).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
