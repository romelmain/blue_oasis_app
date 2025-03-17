import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  readonly API_URL = 'http://localhost:8080/guest/';
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;
  constructor(private http: HttpClient) {}

  getGuestByUser(user: string) {
    const headers = { Authorization: this.authorization };
    return this.http.get<any>(`${this.API_URL}user/${user}`, { headers });
  }
}
