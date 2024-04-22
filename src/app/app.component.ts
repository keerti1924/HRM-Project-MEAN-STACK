import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountserviceService } from './account/accountservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'HRM Website';
  isLoggedIn: boolean = false;
  userRole: string = '';

  constructor(public router: Router,private accountService: AccountserviceService) {}

  ngOnInit() {
    this.isLoggedIn = this.accountService.isAuthenticated();
  }

}
