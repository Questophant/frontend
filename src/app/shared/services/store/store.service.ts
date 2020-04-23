import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor() { }

	setUserId(userId: string): void {
		localStorage.setItem(environment.apiService + '_userId', userId);
	}

	getUserId(): string | null {
		return localStorage.getItem(environment.apiService + '_userId');
	}

	addRememberedChallenge(challengeId: number): void {
		this.addToArray<number>('rememberedChallenges', challengeId);
	}

	removeRememberedChallenge(challengeId: number): void {
		this.removeFromArray<number>('rememberedChallenges', challengeId);
	}

	getRememberedChallenges(): number[] {
		return this.getArray<number>('rememberedChallenges');
	}

	addAcceptedChallenge(challengeId: number): void {
		this.addToArray<number>('acceptedChallenges', challengeId);
	}

	removeAcceptedChallenge(challengeId: number): void {
		this.removeFromArray<number>('acceptedChallenges', challengeId);
	}

	getAcceptedChallenges(): number[] {
		return this.getArray<number>('acceptedChallenges');
	}

	private getArray<T>(key: string): T[] {
		try {
			return JSON.parse(localStorage.getItem(key) || '[]');
		} catch (e) {
			this.saveArray(key, []);
			return [];
		}
	}

	private addToArray<T>(key: string, item: T): void {
		const values = this.getArray<T>(key);

		if (!(values.indexOf(item) > -1)) {
			values.push(item);
		}

		this.saveArray(key, values);
	}

	private saveArray<T>(key: string, value: T[]): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	private removeFromArray<T>(key: string, item: T): void {
		const values = this.getArray<T>(key);

		this.saveArray(
			key,
			values.filter((element) => element !== item)
		);
	}
}
