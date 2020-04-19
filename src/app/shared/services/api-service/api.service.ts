import { Category } from '../../dtos/category';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { UserDto } from '../../dtos/user.dto';

export abstract class ApiService {
	public getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	public createNewChallenge(
		challenge: ChallengeDto
	): Promise<ChallengeDto | string> {
		throw new Error('Method not implemented.');
	}

	public getAllChallengesOfUser(): Promise<ChallengeDto[]> {
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

	getAllChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	createNewUser(user: UserDto): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}
}
