import { Injectable } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';

@Injectable()
//** This API Service simulates a backend. **//
export class SimulationApiService implements ApiService {
	getDailyChallenge(): Promise<ChallengeDto> {
		throw new Error('Method not implemented.');
	}
}
