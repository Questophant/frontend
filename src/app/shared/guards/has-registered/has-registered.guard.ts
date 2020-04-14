import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
/**
 * Secures that a user has set a userName (registered) before entering any other page
 */
export class HasRegisteredGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.auth.isUserRegistered()) {
			return true;
		} else {
			this.router.navigate(['/welcome']).then(
				(value) => {
					if (!value) {
						alert('Redirect failed');
					}
				},
				(reason) => {
					alert(reason);
				}
			);
			return false;
		}
	}
}
