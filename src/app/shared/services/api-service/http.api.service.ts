import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';

@Injectable()
export class HTTPApiService implements ApiService {
	private cachedDailyChallenge: ChallengeDto;
	private cacheDay: number;

	constructor(private httpClient: HttpClient) {}

	/** Overwrite this method for your own endpoint. */
	protected getApiURL(): string {
		return null;
	}

	private checkCache() {
		let date = new Date();
		let day = date.getDate();

		// new values at 1:30h => reset at 2 o'clock
		if (this.cacheDay != day) {
			console.log('Resetting caches.');
			this.cacheDay = day;
			this.cachedDailyChallenge = null;
		}
	}

	getDailyChallenge(): Promise<ChallengeDto> {
		this.checkCache();
		if (this.cachedDailyChallenge) {
			return new Promise((resolve, reject) => {
				resolve(this.cachedDailyChallenge);
			});
		}

		return this.getChallengeFromUrl(
			`${this.getApiURL()}/daily_challenge`
		).then((challenge) => {
			this.cachedDailyChallenge = challenge;
			return challenge;
		});
	}

	private getChallengeFromUrl(url: string): Promise<ChallengeDto> {
		return new Promise((resolve, reject) => {
			this.httpClient.get<ChallengeDto>(url).subscribe(
				(data: ChallengeDto) => {
					resolve(data);
				},
				(error) => {
					reject('Error! ' + error.message);
				}
			);
		});
	}
}
