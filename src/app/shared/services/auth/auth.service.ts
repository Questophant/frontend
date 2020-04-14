import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { StoreService } from '../store/store.service';

@Injectable({
	providedIn: 'root',
})
/**
 * - get unique id
 * - set name
 * - save name on browser
 */
export class AuthService {
	constructor(private store: StoreService, private api: ApiService) {}

	register(name: string): Promise<void> {
		return this.api.createNewUser().then(
			(user) =>
				this.api.updateUser(user.id, { id: null, name }).then(
					(value) => {
						this.store.setUserId(user.id);
					},
					(reason) => {
						alert(reason);
					}
				),
			(reason) => {
				alert(reason);
			}
		);
	}

	isUserRegistered(): boolean {
		return this.store.getUserId() !== null;
	}
}
