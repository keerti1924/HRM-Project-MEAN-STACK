import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:3000/employees'; // Your backend API URL

  constructor(private http: HttpClient) { }

  createEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
