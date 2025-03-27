import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Login from '../models/Login';
import LoginResponse from '../models/LoginResponse';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly API_URL = environment.loginUrl;
  constructor(private http: HttpClient) {}

  postLogin(login: Login) {
    return this.http.post<LoginResponse>(this.API_URL, login);
  }
}
