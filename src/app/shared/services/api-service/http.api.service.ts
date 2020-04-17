import { HttpClient } from '@angular/common/http';
import { Categories, Category } from '../../dtos/category';
import { ChallengeDto, ChallengeResponse } from '../../dtos/challenge.dto';
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

	getChallenges(category: Category): Promise<ChallengeDto[]> {
		if (category) {
			return this.getChallengesFromUrl(
				`${
					this.apiUrl
				}/users/${this.store.getUserId()}/challenge_stream?category=${
					category.name
				}&pageIndex=0&pageSize=10`
			);
		}
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/users/${this.store.getUserId()}/challenge_stream?pageIndex=0&pageSize=10`
		);
	}

	createNewUser(user: UserDto): Promise<UserDto> {
		return this.httpClient
			.post<UserDto>(`${this.apiUrl}/users`, user)
			.toPromise();
	}

	getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/users/${this.store.getUserId()}/challenges`
		);
	}

	createNewChallenge(challenge: ChallengeDto): Promise<ChallengeDto> {
		return this.httpClient
			.post<ChallengeResponse>(
				`${this.apiUrl}/users/${this.store.getUserId()}/challenges`,
				challenge
			)
			.toPromise()
			.then(this.mapChallenge());
	}

	deleteChallenge(challengeId: number): Promise<ChallengeDto> {
		return this.httpClient
			.delete<ChallengeResponse>(
				`${
					this.apiUrl
				}/users/${this.store.getUserId()}/challenges/${challengeId}`
			)
			.toPromise()
			.then(this.mapChallenge());
	}

	getRandomChallenge(category: Category): Promise<ChallengeDto> {
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

	private mapChallenges() {
		return (challenges: ChallengeResponse[]) =>
			challenges.map(this.mapChallenge());
	}

	private mapChallenge() {
		return (challenge: ChallengeResponse) => ({
			id: challenge.id,
			title: challenge.title,
			category: Categories.find((c) => c.name === challenge.category),
			description: challenge.description,
			durationSeconds: challenge.durationSeconds,
		});
	}

	private getChallengeFromUrl(url: string): Promise<ChallengeDto> {
		return this.httpClient
			.get<ChallengeResponse>(url)
			.toPromise()
			.then(this.mapChallenge());
	}

	private getChallengesFromUrl(url: string): Promise<ChallengeDto[]> {
		return this.httpClient
			.get<ChallengeResponse[]>(url)
			.toPromise()
			.then(this.mapChallenges());
	}
}
