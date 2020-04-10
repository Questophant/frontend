import { Injectable } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';

@Injectable()
export class LocalApiService implements ApiService {
	getDailyChallenge(): Promise<ChallengeDto> {
		return Promise.resolve({
			id: 'asdasdad',
			title: 'asdasdasd',
			description: 'lorem ipsum ...',
			category: 'art',
			durationSeconds: 300,
		});
	}
}
