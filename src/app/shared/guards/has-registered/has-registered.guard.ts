import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
/**
 * Secures that a user has set a userId (registered) before entering any other page
 */
export class HasRegisteredGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(): Promise<boolean> {
		return this.auth.checkUserRegistered().then((registered) => {
			if (registered) {
				return true;
			}

			this.router.navigate(['/welcome']).then(
				(value) => {
					if (value === false) {
						alert('Redirect failed');
					}
				},
				(reason) => {
					alert('Redirect failed');
				}
			);
			return false;
		});
	}
}
