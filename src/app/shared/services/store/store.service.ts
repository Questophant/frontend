import { Injectable } from '@angular/core';

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
}
