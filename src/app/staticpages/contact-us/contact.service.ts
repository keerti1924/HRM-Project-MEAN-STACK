import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://localhost:3000'; // Your backend API URL

  constructor(private http: HttpClient) { }

  saveContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, formData);
  }
}
