import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, location: any): Observable<any> {
    const data = {
      name,
      email,
      password,
      location
    };
    return this.http.post(`${this.apiUrl}/register`, data);
  }

}
