import { HttpClient } from '@angular/common/http';
import { Category } from '../../dtos/category';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { UserProfile } from '../../dtos/user-profile.dto';
import { Store } from '../../storage/store';
import { ApiService } from './api.service';

export abstract class HTTPApiService implements ApiService {
	protected apiUrl: string;
	private cachedDailyChallenge: ChallengeDto;
	private cacheDay: number;

	constructor(protected httpClient: HttpClient, protected store: Store) { }

	protected checkCache() {
		const date = new Date();
		const day = date.getDate();

		// new values every day
		if (this.cacheDay != day) {
			console.log('Resetting caches.');
			this.cacheDay = day;
			this.cachedDailyChallenge = null;
		}
	}

	private getOrCreateUserId(): Promise<string> {
		return this.getOrCreateUserData().then((userData) => {
			return userData.userId;
		});
	}

	private getOrCreateUserData(): Promise<UserProfile> {
		return new Promise((resolve, reject) => {
			if (this.store.getUserProfile() == undefined) {
				// Do API request toget UID
				this.createNewUser().then(
					(newUserProfile: UserProfile) => {
						resolve(newUserProfile);
					},
					(error) => {
						reject('Canot access userId! ' + error.message);
					}
				);
			} else {
				resolve(this.store.getUserProfile());
			}
		});
	}

	private createNewUser() {
		return new Promise((resolve, reject) => {
			this.httpClient.post(`${this.apiUrl}/users`, '').subscribe(
				(newUserProfile: UserProfile) => {
					this.store.setUserProfile(newUserProfile);
					resolve(newUserProfile);
				},
				(error) => {
					reject('Error! ' + error.message);
				}
			);
		});
	}

	public getDailyChallenge(): Promise<ChallengeDto> {
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
