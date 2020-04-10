import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../dtos/user-profile.dto';

@Injectable()
export class Store {
	private userProfile: UserProfile;

	constructor(private persistenceService: PersistenceService) {
		this.userProfile = this.persistenceService.get(
			this.getUserServiceKey(),
			StorageType.LOCAL
		);
	}

	private getUserServiceKey(): string {
		return environment.apiService + '_USER_DATA';
	}

	getUserProfile(): UserProfile {
		return this.userProfile;
	}

	setUserProfile(userProfile: UserProfile) {
		this.userProfile = userProfile;
		if (
			!this.persistenceService.set(this.getUserServiceKey, userProfile, {
				type: StorageType.LOCAL,
			})
		) {
			console.log('Can`t set local storage');
		}
	}
}
