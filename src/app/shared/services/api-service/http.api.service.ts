import { HttpClient } from '@angular/common/http';
import { Categories, Category } from '../../dtos/category';
import { ChallengeDto, ChallengeResponse } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';
import { StoreService } from '../store/store.service';
import { UserDto } from '../../dtos/user.dto';
import { ChallengeState } from '../../dtos/challenge-state.enum';
import { PointsDto } from '../../dtos/points.dto';
import { CreateChallengeDto } from '../../dtos/create-challenge.dto';
import { AchievementDto } from '../../dtos/achievement.dto';

export abstract class HTTPApiService implements ApiService {
	protected apiUrl: string;
	private cachedDailyChallenge: ChallengeDto;
	private cacheDay: number;

	constructor(protected http: HttpClient, private store: StoreService) {}

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

	getChallenges(
		category: Category,
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		if (category) {
			return this.getChallengesFromUrl(
				`${
					this.apiUrl
				}/myUser/${this.store.getUserId()}/challenge_stream?category=${
					category.name
				}&pageIndex=${page}&pageSize=${size}`
			);
		}
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/myUser/${this.store.getUserId()}/challenge_stream?pageIndex=${page}&pageSize=${size}`
		);
	}

	createNewUser(user: UserDto): Promise<UserDto> {
		return this.http
			.post<UserDto>(`${this.apiUrl}/myUser`, user)
			.toPromise();
	}

	getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/challenges`
		);
	}

	createNewChallenge(challenge: CreateChallengeDto): Promise<ChallengeDto> {
		return this.http
			.post<ChallengeResponse>(
				`${
					this.apiUrl
				}/myUser/${this.store.getUserId()}/created_challenges`,
				challenge
			)
			.toPromise()
			.then(this.mapChallenge());
	}

	deleteChallenge(challengeId: number): Promise<ChallengeDto> {
		return this.http
			.delete<ChallengeResponse>(
				`${
					this.apiUrl
				}/myUser/${this.store.getUserId()}/created_challenges/${challengeId}`
			)
			.toPromise()
			.then(this.mapChallenge());
	}

	getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.getChallengeFromUrl(
			`${this.apiUrl}/random_challenge?category=${category}`
		);
	}

	getChallengeById(id: number): Promise<ChallengeDto> {
		return this.getChallengeFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/challenge/${id}`
		);
	}

	changeChallengeState(
		challenge: ChallengeDto,
		state: ChallengeState
	): Promise<void> {
		return this.http
			.post<void>(
				`${
					this.apiUrl
				}/myUser/${this.store.getUserId()}/challenge_status/${
					challenge.id
				}?state=${state}`,
				{}
			)
			.toPromise();
	}

	getActiveChallenges(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/ongoing_challenges`
		);
	}

	getCreatedChallenges(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/created_challenges`
		);
	}

	getDoneChallenges(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/done_challenges`
		);
	}

	getRememberedChallenges(): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/marked_challenges`
		);
	}

	rememberChallenge(
		challenge: ChallengeDto,
		remember: boolean
	): Promise<ChallengeDto> {
		return this.http
			.post<ChallengeDto>(
				`${
					this.apiUrl
				}/myUser/${this.store.getUserId()}/marked_challenges/${
					challenge.id
				}?marked=${remember}`,
				{}
			)
			.toPromise();
	}

	getChallengesForUser(userId: string): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${this.apiUrl}/myUser/${userId}/done_challenges`
		);
	}

	getUser(userId: string): Promise<UserDto> {
		return this.http
			.get<UserDto>(`${this.apiUrl}/myUser/${userId}`)
			.toPromise();
	}

	getPointsOfUser(): Promise<PointsDto> {
		return this.http
			.get<PointsDto>(
				`${this.apiUrl}/myUser/${this.store.getUserId()}/points`
			)
			.toPromise();
	}

	getAchievementsForUser(id: string): Promise<AchievementDto> {
		return this.http
			.get<AchievementDto>(`${this.apiUrl}/publicUser/${id}/achievments`)
			.toPromise();
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
			createdBy: challenge.createdByUserName,
			material: challenge.material,
			imageUrl: challenge.imageUrl,
			pointsLoose: challenge.pointsLoose,
			pointsWin: challenge.pointsWin,
			ongoing: challenge.ongoing,
			marked: challenge.marked,
		});
	}

	private getChallengeFromUrl(url: string): Promise<ChallengeDto> {
		return this.http
			.get<ChallengeResponse>(url)
			.toPromise()
			.then(this.mapChallenge());
	}

	private getChallengesFromUrl(url: string): Promise<ChallengeDto[]> {
		return this.http
			.get<ChallengeResponse[]>(url)
			.toPromise()
			.then(this.mapChallenges());
	}
}
