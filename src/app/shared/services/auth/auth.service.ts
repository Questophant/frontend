import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { StoreService } from '../store/store.service';

@Injectable({
	providedIn: 'root',
})
/**
 * - get unique userId
 * - set userName
 * - save userName on browser
 */
export class AuthService {
	constructor(private store: StoreService, private api: ApiService) {}

	register(name: string): Promise<void> {
		return this.api.createNewUser().then(
			(user) =>
				this.api
					.updateUser(user.userId, { userId: null, userName: name })
					.then(
						(value) => {
							this.store.setUserId(user.userId);
						},
						(reason) => {
							alert(
								'Es ist ein Fehler bei der Registrierung aufgetreten!'
							);
						}
					),
			(reason) => {
				alert('Es ist ein Fehler bei der Registrierung aufgetreten!');
			}
		);
	}

	isUserRegistered(): boolean {
		return this.store.getUserId() !== null;
	}
}
