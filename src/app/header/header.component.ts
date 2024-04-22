import { Component, OnInit } from '@angular/core';
import { Router }  from "@angular/router";
import { AccountserviceService } from '../account/accountservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AccountserviceService,public router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      // Retrieve the user name from local storage
      const userData = localStorage.getItem('Loginuser');
      if (userData) {
        const user = JSON.parse(userData);
        this.userName = user.name; // Assuming the user object has a 'name' property
      }
    }
  }

  logout() {
    localStorage.removeItem('Loginuser');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }


}
