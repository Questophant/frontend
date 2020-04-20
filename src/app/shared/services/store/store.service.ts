import { Injectable } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor() {}

	setUserId(userId: string): void {
		localStorage.setItem('userId', userId);
	}

	getUserId(): string | null {
		return localStorage.getItem('userId');
	}

	addRememberedChallenge(challenge: ChallengeDto): void {
		this.addToArray<ChallengeDto>('rememberedChallenges', challenge);
	}

	removeRememberedChallenge(challenge: ChallengeDto): void {
		this.removeFromArray<ChallengeDto>('rememberedChallenges', challenge);
	}

	getRememberedChallenges(): ChallengeDto[] {
		return this.getArray<ChallengeDto>('rememberedChallenges');
	}

	private getArray<T>(key: string): T[] {
		return JSON.parse(localStorage.getItem(key) || '[]');
	}

	private addToArray<T>(key: string, item: T): void {
		const values = this.getArray<T>(key);
		values.push(item);

		this.saveArray(key, values);
	}

	private saveArray<T>(key: string, value: T[]): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	private removeFromArray<T>(key: string, item: T): void {
		let values = this.getArray<T>(key);

		values.forEach((element, index) => {
			if (element === item) {
				values.splice(index, 1);
			}
		});
		// values = values.filter((e) => e !== item);
		this.saveArray(key, values);
	}
}
