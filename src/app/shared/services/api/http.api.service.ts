import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AchievementDto } from '../../dtos/achievement.dto';
import { Categories, Category } from '../../dtos/category';
import { ChallengeState } from '../../dtos/challenge-state.enum';
import { ChallengeDto, ChallengeResponse } from '../../dtos/challenge.dto';
import { CreateChallengeDto } from '../../dtos/create-challenge.dto';
import { PointsDto } from '../../dtos/points.dto';
import { UserDto } from '../../dtos/user.dto';
import { StoreService } from '../store/store.service';
import { ApiService } from './api.service';

export abstract class HTTPApiService extends ApiService {
	protected apiUrl: string;

	private cachedDailyChallenge: ChallengeDto;
	private cacheDate: number;

	constructor(protected http: HttpClient, private store: StoreService) {
		super();
	}

	getChallengeById(id: number): Promise<ChallengeDto> {
		return this.getChallengeFromUrl(
			`${this.apiUrl}/myUser/${this.store.getUserId()}/challenge/${id}`
		);
	}

	getDailyChallenge(): Promise<ChallengeDto> {
		const date = new Date().getDate();

		if (this.cacheDate && this.cacheDate === date) {
			// Return cached DailyChallenge
			return Promise.resolve(this.cachedDailyChallenge);
		}

		return this.getChallengeFromUrl(`${this.apiUrl}/daily_challenge`).then(
			(challenge) => {
				this.cachedDailyChallenge = challenge;
				this.cacheDate = date;
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

	getActiveChallenges(page: number, size: number): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/myUser/${this.store.getUserId()}/ongoing_challenges?pageIndex=${page}&pageSize=${size}`
		);
	}

	getCreatedChallenges(page: number, size: number): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/myUser/${this.store.getUserId()}/created_challenges?pageIndex=${page}&pageSize=${size}`
		);
	}

	getDoneChallenges(page: number, size: number): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/myUser/${this.store.getUserId()}/done_challenges?pageIndex=${page}&pageSize=${size}`
		);
	}

	getRememberedChallenges(
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		return this.getChallengesFromUrl(
			`${
				this.apiUrl
			}/myUser/${this.store.getUserId()}/marked_challenges?pageIndex=${page}&pageSize=${size}`
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

	createNewUser(user: UserDto): Promise<UserDto> {
		return this.http
			.post<UserDto>(`${this.apiUrl}/myUser`, user)
			.toPromise();
	}

	getMyUser(userId: string): Promise<UserDto> {
		return this.http
			.get<UserDto>(`${this.apiUrl}/myUser/${userId}`)
			.toPromise();
	}

	getPublicUserProfile(publicUserId: string): Promise<UserDto> {
		return this.http
			.get<UserDto>(`${this.apiUrl}/publicUser/${publicUserId}`)
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
			.get<AchievementDto>(`${this.apiUrl}/publicUser/${id}/achievements`)
			.toPromise();
	}

	setUserImage(imageBase64: string): Promise<UserDto> {
		return this.http
			.post<UserDto>(
				`${this.apiUrl}/myUser/${this.store.getUserId()}/image`,
				imageBase64
			)
			.toPromise()
			.catch(this.getDefaultExceptionHandler());
	}

	getApiUrl(): string {
		return this.apiUrl;
	}

	getDefaultExceptionHandler(): (httpErrorResponse: any) => any {
		return (httpErrorResponse: HttpErrorResponse) => {
			if (
				environment.resetOnUserNotFound &&
				httpErrorResponse.status === 404 &&
				httpErrorResponse.error === 'MyUser not found.'
			) {
				window.alert(
					'Die Datenbank ist zurückgesetzt worden.\nSetze die App ebenfalls zurück.'
				);
				this.store.reset();
				window.location.reload();
			} else {
				window.alert(
					'Fehler bei der Kontaktaufnahme mit dem Server.\nVersuchen Sie es später noch einmal.'
				);
			}
			throw httpErrorResponse;
		};
	}

	private mapChallenges(): (
		challenges: ChallengeResponse[]
	) => ChallengeDto[] {
		return (challenges: ChallengeResponse[]) =>
			challenges.map(this.mapChallenge());
	}

	private mapChallenge(): (challenge: ChallengeResponse) => ChallengeDto {
		return (challenge: ChallengeResponse) => ({
			id: challenge.id,
			title: challenge.title,
			category: Categories.find((c) => c.name === challenge.category),
			description: challenge.description,
			durationSeconds: challenge.durationSeconds,
			createdByPublicUserId: challenge.createdByPublicUserId,
			createdByUserName: challenge.createdByUserName,
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
			.then(this.mapChallenge())
			.catch(this.getDefaultExceptionHandler());
	}

	private getChallengesFromUrl(url: string): Promise<ChallengeDto[]> {
		return this.http
			.get<ChallengeResponse[]>(url)
			.toPromise()
			.then(this.mapChallenges())
			.catch(this.getDefaultExceptionHandler());
	}
}
