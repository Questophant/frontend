import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
/**
 * Secures that a user has set a userId (registered) before entering any other page
 */
export class HasRegisteredGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		return this.auth.checkUserRegistered().then((registered) => {
			if (registered) {
				return true;
			}

			const queryParams =
				state.url && state.url !== '/'
					? { queryParams: { redirect: btoa(state.url) } }
					: undefined;

			this.router.navigate(['/welcome'], queryParams).then(
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
