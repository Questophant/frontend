import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor() {}

	getDailyChallenge(): string {
		return 'daily challenge';
	}
}

export class LocalApiService extends ApiService {
	getDailyChallenge(): string {
		return null;
	}
}
