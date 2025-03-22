import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TableModule } from 'primeng/table';
import Booking from '../../models/booking';
import Room from '../../models/room';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  imports: [HeaderComponent, TableModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css',
})
export class BookingDetailsComponent implements OnInit {
  booking!: any;
  rooms!: Room[];
  guestId = localStorage.getItem('guest_id');
  nguestId = Number(this.guestId);

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getBookingByGuest(this.nguestId).subscribe({
      next: (data) => {
        console.log(data);
        this.booking = data;
        this.rooms = data.rooms;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  formateDate(date: string) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  }
}
