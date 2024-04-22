import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountserviceService } from './accountservice.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AccountserviceService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true; // Allow access if the user is not authenticated
        } else {
            this.router.navigate(['/']); // Redirect to homepage if the user is already authenticated
            return false;
        }
    }
}
