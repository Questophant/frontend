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
}
