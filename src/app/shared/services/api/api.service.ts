import { AchievementDto } from '../../dtos/achievement.dto';
import { Category } from '../../dtos/category';
import { ChallengeListType } from '../../dtos/challenge-list-type';
import { ChallengeState } from '../../dtos/challenge-state.enum';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { CreateChallengeDto } from '../../dtos/create-challenge.dto';
import { PointsDto } from '../../dtos/points.dto';
import { UserDto } from '../../dtos/user.dto';

export abstract class ApiService {
	public getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public getChallengeById(id: number): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public getChallenges(
		category: Category,
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getChallengeList(
		challengeListType: ChallengeListType,
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		switch (challengeListType.name) {
			case 'active':
				return this.getActiveChallenges(page, size);
			case 'marked':
				return this.getRememberedChallenges(page, size);
			case 'done':
				return this.getDoneChallenges(page, size);
			case 'created':
				return this.getCreatedChallenges(page, size);
		}
		throw new Error(
			'ChallengeListType ' + challengeListType.name + ' not implemented.'
		);
	}

	public getCreatedChallenges(
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getDoneChallenges(
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getRememberedChallenges(
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getActiveChallenges(
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public createNewChallenge(
		challenge: CreateChallengeDto
	): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public deleteChallenge(
		challengeId: number
	): Promise<ChallengeDto | string> {
		throw new Error('Method not implemented.');
	}

	public changeChallengeState(
		challenge: ChallengeDto,
		state: ChallengeState
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public rememberChallenge(
		challenge: ChallengeDto,
		remember: boolean
	): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	createNewUser(user: UserDto): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public getMyUser(userId: string): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public getPublicUserProfile(publicUserId: string): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public setUserImage(imageBase64: string): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public getPointsOfUser(): Promise<PointsDto> {
		throw new Error('Method not implemented.');
	}

	public getAchievementsForUser(id: string): Promise<AchievementDto> {
		throw new Error('Method not implemented.');
	}

	public getApiUrl(): string {
		throw new Error('Method not implemented.');
	}

	public getDefaultExceptionHandler(): (httpErrorResponse: any) => any {
		throw new Error('Method not implemented.');
	}
}
