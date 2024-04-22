import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;
  datasaved = false;
  message: string = '';
  error: string = '';
  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService) { }

  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.regForm = this.formbuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.regForm.valid) {
      let userinfo = this.regForm.value;
      // console.log(userinfo);
      this.createuserAccount(userinfo);
      this.regForm.reset();
    }
  }
  createuserAccount(accinfo: Accountinfo) {
    this.accountservice.createaccount(accinfo).subscribe(
      (resResult: any) => {
        // let resp = JSON.stringify(resResult);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.error = resResult['error'];
        this.regForm.reset();
      },
      (error) => {
        // Handle error if user registration fails
        console.error('Error creating user account:', error);
        // You can optionally display an error message to the user
        this.message = "Error creating user account. Please try again.";
      }
    );
  }
}
