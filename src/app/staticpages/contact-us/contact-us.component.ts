import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  showThankYouMessage: boolean = false;
  errorMessage: string = '';

  constructor(private contactService: ContactService) {}

  submitForm(contactForm: NgForm): void { // Use NgForm to access form data
    if (contactForm.valid) {
      this.contactService.saveContactForm(contactForm.value).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.showThankYouMessage = true;
          contactForm.resetForm();
          this.errorMessage = ''; // Reset error message
        },
        (error) => {
          console.error('Error submitting form:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Show error message from backend
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    }
  }
}
