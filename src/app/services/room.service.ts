import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Room from '../models/room';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly API_URL = environment.roomUrl;
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;
  constructor(private http: HttpClient) {}

  getRooms() {
    const headers = { Authorization: this.authorization };
    return this.http.get<Room[]>(this.API_URL, { headers });
  }

  getRoomsById(id: number) {
    const headers = { Authorization: this.authorization };
    return this.http.get<Room>(`${this.API_URL}/${id}`, { headers });
  }
}
