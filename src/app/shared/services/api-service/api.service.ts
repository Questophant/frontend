import { AchievementDto } from '../../dtos/achievement.dto';
import { Category } from '../../dtos/category';
import { ChallengeState } from '../../dtos/challenge-state.enum';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { PointsDto } from '../../dtos/points.dto';
import { UserDto } from '../../dtos/user.dto';

export abstract class ApiService {
	public getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public createNewChallenge(challenge: ChallengeDto): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public getChallengeById(id: number): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	getChallengesForUser(userId: string): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getChallenges(
		category: Category,
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public deleteChallenge(
		challengeId: number
	): Promise<ChallengeDto | string> {
		throw new Error('Method not implemented.');
	}

	public getRandomChallenge(category: Category): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	createNewUser(user: UserDto): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public changeChallengeState(
		challenge: ChallengeDto,
		state: ChallengeState
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public getCreatedChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getDoneChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getRememberedChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	public getActiveChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	getUser(userId: string): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	public rememberChallenge(
		challenge: ChallengeDto,
		remember: boolean
	): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public getPointsOfUser(): Promise<PointsDto> {
		throw new Error('Method not implemented.');
	}

	public getAchievementsForUser(id: string): Promise<AchievementDto> {
		throw new Error('Method not implemented.');
	}

	public getDefaultExceptionHandler() {
		// NO OP
	}
}
