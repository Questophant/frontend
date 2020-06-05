import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StoreService } from '../store/store.service';

@Injectable({
	providedIn: 'root',
})
export class AchievementService {

	constructor(
		private readonly api: ApiService,
		private readonly store: StoreService,
	) {
	}

	checkNewAchievement(): Promise<boolean> {
		const oldHash = localStorage.getItem('ac_h');

		return this.api.getAchievementsForUser(this.store.getPublicUserId())
			.then(achievements => btoa(JSON.stringify(achievements)))
			.then(hash => {
				console.log(oldHash);
				console.log(hash);
				if (oldHash == null) {
					localStorage.setItem('ac_h', hash);
					return false;
				}
				if (oldHash !== hash) {
					localStorage.setItem('ac_h', hash);
					return true;
				}
				return false;
			});
	}
}
