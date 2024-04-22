import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accountinfo } from './accountinfo';

import { Userloginfo } from './userloginfo';



@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  url = 'http://localhost:3000/'
  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) { }
  createaccount(accinfo: Accountinfo): Observable<Accountinfo> {

    return this.http.post<Accountinfo>(this.url + 'api/register', accinfo)
  }

  userlogin(logininfo: Userloginfo): Observable<Userloginfo> {

    return this.http.post<Userloginfo>(this.url + 'api/login', logininfo)
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Check if the code is running in a browser environment
      // Check if the user is authenticated by verifying the presence of user data in localStorage
      return !!localStorage.getItem('Loginuser');
    }
    return false; // Return false if not running in a browser environment
  }

  isAdminLoggedIn(): boolean {
    // Check if admin is logged in (e.g., check local storage or user role)
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user && user.role === 'admin';
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('Loginuser');
      localStorage.removeItem('userData');
    }
  }

}
