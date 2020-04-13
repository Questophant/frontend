import { ChallengeDto } from '../../dtos/challenge.dto';

export abstract class ApiService {
	getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}

	getAllChallenges(): Promise<ChallengeDto[]> {
		throw new Error('Method not implemented.');
	}
}
