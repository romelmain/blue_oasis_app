import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Login from '../models/Login';
import LoginResponse from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly API_URL = 'http://localhost:8080/auth/log-in';
  constructor(private http: HttpClient) {}

  postLogin(login: Login) {
    return this.http.post<LoginResponse>(this.API_URL, login);
  }
}
