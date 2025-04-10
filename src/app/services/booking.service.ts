import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Booking from '../models/booking';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  readonly API_URL = environment.bookingUrl;
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;
  constructor(private http: HttpClient) {}

  postBooking(booking: Booking) {
    const headers = {
      Authorization: this.authorization,
      'Content-Type': 'application/json',
    };
    return this.http.post<any>(this.API_URL, booking, { headers });
  }

  getBookingByGuest(guestId: number) {
    const headers = {
      Authorization: this.authorization,
      'Content-Type': 'application/json',
    };
    return this.http.get<any>(`${this.API_URL}/guest/${guestId}`, { headers });
  }
}
