import { ChallengeDto } from '../../dtos/challenge.dto';
import { UserDto } from '../../dtos/user.dto';

export abstract class ApiService {
	getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	getAllChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}

	createNewUser(): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}

	updateUser(userId: string, user: UserDto): Promise<UserDto> {
		throw new Error('Method not implemented.');
	}
}
