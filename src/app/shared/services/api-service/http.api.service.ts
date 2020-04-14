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

	public getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return this.getOrCreateUserId().then((userId) => {
			return new Promise((resolve, reject) => {
				this.httpClient
					.get<ChallengeDto[]>(
						`${this.apiUrl}/users/${userId}/challenges`
					)
					.subscribe(
						(data: ChallengeDto[]) => {
							resolve(data);
						},
						(error) => {
							reject('Error! ' + error.message);
						}
					);
			});
		});
	}

	public createNewChallenge(
		challenge: ChallengeDto
	): Promise<ChallengeDto | string> {
		return this.getOrCreateUserId().then((userId) => {
			return new Promise((resolve, reject) => {
				this.httpClient
					.post<ChallengeDto>(
						`${this.apiUrl}/users/${userId}/challenges`,
						challenge
					)
					.subscribe(
						(data: ChallengeDto) => {
							resolve(data);
						},
						(error) => {
							reject('Error! ' + error.message);
						}
					);
			});
		});
	}

	public deleteChallenge(challengeId: number): Promise<ChallengeDto | string> {
		return this.getOrCreateUserId().then((userId) => {
			return new Promise((resolve, reject) => {
				this.httpClient
					.delete<ChallengeDto>(
						`${this.apiUrl}/users/${userId}/challenges/${challengeId}`
					)
					.subscribe(
						(data: ChallengeDto) => {
							resolve(data);
						},
						(error) => {
							resolve(null);
							//reject("Error! " + error.message);
						}
					);
			});
		});
	}

	public getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.getChallengeFromUrl(
			`${this.apiUrl}/random_challenge?category=${category}`
		);
	}
}
