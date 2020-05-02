import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../../dtos/user.dto';
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
		const userO: UserDto = {
			publicUserId: null,
			privateUserId: null,
			userName: name,
		};
		return this.api.createNewUser(userO).then((user) => {
			this.store.setPublicUserId(user.publicUserId);
			this.store.setUserId(user.privateUserId);
		});
	}

	isUserRegistered(): boolean {
		return this.store.getUserId() !== null;
	}

	checkUserRegistered(): Promise<boolean> {
		const userId = this.store.getUserId();

		if (userId === null) {
			return Promise.resolve(false);
		}

		return this.api
			.getUser(userId)
			.then((user) => {
				return true;
			})
			.catch((httpErrorResponse: HttpErrorResponse) => {
				if (
					httpErrorResponse.status === 404 &&
					httpErrorResponse.error === 'MyUser not found.'
				) {
					return false;
				}
				throw httpErrorResponse;
			});
	}
}
