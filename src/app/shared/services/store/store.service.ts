import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor() {}

	setPublicUserId(userId: string): void {
		let prefix =
			environment.apiService === 'production'
				? ''
				: environment.apiService + '_';
		localStorage.setItem(prefix + 'publicUserId', userId);
	}

	getPublicUserId(): string | null {
		let prefix =
			environment.apiService === 'production'
				? ''
				: environment.apiService + '_';
		return localStorage.getItem(prefix + 'publicUserId');
	}

	setUserId(privateUserId: string) {
		let prefix =
			environment.apiService === 'production'
				? ''
				: environment.apiService + '_';
		localStorage.setItem(prefix + 'userId', privateUserId);
	}

	getUserId(): string | null {
		let prefix =
			environment.apiService === 'production'
				? ''
				: environment.apiService + '_';
		return localStorage.getItem(prefix + 'userId');
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
