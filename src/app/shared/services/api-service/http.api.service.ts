import { HttpClient } from '@angular/common/http';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';
import { UserDto } from '../../dtos/user.dto';

export abstract class HTTPApiService implements ApiService {
	protected apiUrl: string;
	private cachedDailyChallenge: ChallengeDto;
	private cacheDay: number;

	constructor(protected httpClient: HttpClient) {}

	getDailyChallenge(): Promise<ChallengeDto> {
		this.checkCache();
		if (this.cachedDailyChallenge) {
			return new Promise((resolve, reject) => {
				resolve(this.cachedDailyChallenge);
			});
		}

		return this.getChallengeFromUrl(`${this.apiUrl}/daily_challenge`).then(
			(challenge) => {
				this.cachedDailyChallenge = challenge;
				return challenge;
			}
		);
	}

	getAllChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Not implemented');
	}

	getUserId(): Promise<UserDto> {
		throw new Error('not implemented');
	}

	updateUser(userId: string, user: UserDto): Promise<UserDto> {
		return this.httpClient
			.post<UserDto>(`${this.apiUrl}/users`, user)
			.toPromise();
	}

	protected checkCache() {
		const date = new Date();
		const day = date.getDate();

		// new values at 1:30h => reset at 2 o'clock
		if (this.cacheDay != day) {
			console.log('Resetting caches.');
			this.cacheDay = day;
			this.cachedDailyChallenge = null;
		}
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
