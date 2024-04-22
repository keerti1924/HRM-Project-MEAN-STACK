import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AccountserviceService } from '../account/accountservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  employees: any[] = [];
  employeeCount: number = 0; 
  isLoggedIn:Boolean = false;
  constructor(private employeeService: EmployeeService,private accountService: AccountserviceService, public router:Router) { }

  ngOnInit(): void {
    this.getEmployees();
    this.isLoggedIn = this.accountService.isAuthenticated();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        this.employeeCount = this.employees.length; // Update the count of employees
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('Loginuser');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
