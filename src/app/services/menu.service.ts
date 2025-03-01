import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Menu from '../models/Menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly API_URL = 'http://localhost:8080/menu';
  token = localStorage.getItem('token');
  authorization: string = 'Bearer ' + this.token;

  constructor(private http: HttpClient) {}

  getMenu() {
    const headers = { Authorization: this.authorization };
    return this.http.get<Menu>(this.API_URL, { headers });
  }
}
