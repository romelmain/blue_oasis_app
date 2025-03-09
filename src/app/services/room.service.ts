import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Room from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly API_URL = 'http://localhost:8080/rooms';
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;
  constructor(private http: HttpClient) {}

  getRooms() {
    const headers = { Authorization: this.authorization };
    return this.http.get<Room[]>(this.API_URL, { headers });
  }
}
