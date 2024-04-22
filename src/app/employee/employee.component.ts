import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AccountserviceService } from '../account/accountservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  employees: any[] = [];
  newEmployee: any = {};
  editedEmployee: any = {};
  editMode: boolean = false;
  isLoggedIn:Boolean = false;

  successMessage: string = '';
  errorMessage: string = '';


  constructor(private employeeService: EmployeeService, private accountService:AccountserviceService, private router:Router) { }

  ngOnInit(): void {
    this.getEmployees();
    this.isLoggedIn = this.accountService.isAuthenticated();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (employee) => {
        console.log('Employee added successfully:', employee);
        this.successMessage = 'Employee Added Successfully !!';
        this.newEmployee = {}; // Reset newEmployee object
        this.getEmployees();
        this.errorMessage = ''; // Refresh employee list
      },
      (error) => {
        console.error('Error adding employee:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message; // Show error message from backend
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  editEmployee(employee: any): void {
    this.editMode = true;
    // Ensure that _id is assigned
    if (employee._id) {
      this.editedEmployee = { ...employee }; // Create a copy of the employee object
    } else {
      console.error('Employee ID is missing');
    }
  }

  updateEmployee(): void {
    if (!this.editedEmployee._id) {
      console.error('Employee ID is missing');
      return;
    }
    this.employeeService.updateEmployee(this.editedEmployee._id, this.editedEmployee).subscribe(
      (updatedEmployee) => {
        console.log('Employee updated successfully:', updatedEmployee);
        // Update the employee in the local array if needed
        const index = this.employees.findIndex(emp => emp._id === updatedEmployee._id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
        }
        this.editedEmployee = {}; // Reset editedEmployee object
        this.successMessage = 'Employee Updated Successfully !!';
        this.getEmployees();
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.getEmployees();
        this.successMessage = 'Employee Deleted Successfully !!'; // Refresh employee list
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }


  logout() {
    localStorage.removeItem('Loginuser');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
