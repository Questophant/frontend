import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
/**
 * Secures that a user has set a name (registered) before entering any other page
 */
export class HasRegisteredGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean {
		if (this.auth.isUserRegistered()) {
			return true;
		} else {
			this.router.navigate(['/welcome']);
			return false;
		}
	}
}
