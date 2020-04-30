import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor() {}

	reset() {
		this.setUserId(null);
		this.setPublicUserId(null);
	}

	private getUserStorageKey(key: string): string {
		return environment.apiService === 'production'
			? key
			: environment.apiService + '_' + key;
	}

	setPublicUserId(userId: string): void {
		localStorage.setItem(this.getUserStorageKey('publicUserId'), userId);
	}

	getPublicUserId(): string | null {
		return localStorage.getItem(this.getUserStorageKey('publicUserId'));
	}

	setUserId(privateUserId: string) {
		localStorage.setItem(this.getUserStorageKey('userId'), privateUserId);
	}

	getUserId(): string | null {
		return localStorage.getItem(this.getUserStorageKey('userId'));
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
