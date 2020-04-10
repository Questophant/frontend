import { Injectable } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';

@Injectable()
/**
 * This API Service simulates a backend.
 */
export class SimApiService implements ApiService {
	getDailyChallenge(): Promise<ChallengeDto> {
		return Promise.resolve({
			id: 0,
			title: 'asdasdasd',
			description: 'lorem ipsum ...',
			category: 'art',
			durationSeconds: 300,
		});
	}
}
