import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Guest from '../models/Guest';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  readonly API_URL = 'http://localhost:8080/guest';
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;
  constructor(private http: HttpClient) {}

  getGuestByUser(user: string) {
    const headers = { Authorization: this.authorization };
    return this.http.get<any>(`${this.API_URL}/user/${user}`, { headers });
  }

  postGuest(guest: Guest) {
    const headers = {
      Authorization: this.authorization,
      'Content-Type': 'application/json',
    };
    return this.http.post<any>(this.API_URL, guest, { headers });
  }
}
