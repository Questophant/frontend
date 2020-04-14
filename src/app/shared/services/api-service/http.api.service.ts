import { HttpClient } from '@angular/common/http';
import { Category } from '../../dtos/category';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';
import { UserDto } from '../../dtos/user.dto';
import { StoreService } from '../store/store.service';

export abstract class HTTPApiService implements ApiService {
	protected apiUrl: string;
	private cachedDailyChallenge: ChallengeDto;
	private cacheDay: number;

	constructor(
		protected httpClient: HttpClient,
		private store: StoreService
	) {}

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

	createNewUser(): Promise<UserDto> {
		return this.httpClient
			.post<UserDto>(`${this.apiUrl}/users`, null)
			.toPromise();
	}

	updateUser(userId: string, user: UserDto): Promise<UserDto> {
		return this.httpClient
			.post<UserDto>(`${this.apiUrl}/users`, user)
			.toPromise();
	}

	public getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return this.httpClient
			.get<ChallengeDto[]>(
				`${this.apiUrl}/users/${this.store.getUserId()}/challenges`
			)
			.toPromise();
	}

	public createNewChallenge(challenge: ChallengeDto): Promise<ChallengeDto> {
		return this.httpClient
			.post<ChallengeDto>(
				`${this.apiUrl}/users/${this.store.getUserId()}/challenges`,
				challenge
			)
			.toPromise();
	}

	public deleteChallenge(challengeId: number): Promise<ChallengeDto> {
		return this.httpClient
			.delete<ChallengeDto>(
				`${
					this.apiUrl
				}/users/${this.store.getUserId()}/challenges/${challengeId}`
			)
			.toPromise();
	}

	public getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.getChallengeFromUrl(
			`${this.apiUrl}/random_challenge?category=${category}`
		);
	}

	protected checkCache() {
		const date = new Date();
		const day = date.getDate();

		// new values at 1:30h => reset at 2 o'clock
		if (this.cacheDay !== day) {
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
