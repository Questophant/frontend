import { Injectable } from '@angular/core';
import { Category } from '../../dtos/category';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { Store } from '../../storage/store';
import { ApiService } from './api.service';

@Injectable()
/**
 * This API Service simulates a backend.
 */
export class SimApiService implements ApiService {

	challenges: ChallengeDto[];
	challengeId: number;

	constructor(protected store: Store) {
		this.challenges.push({
			id: 0,
			title: 'Simulation',
			description: 'This is a simulation challenge.',
			category: Category.fun,
			durationSeconds: 300,
		});
	}

	public getDailyChallenge(): Promise<ChallengeDto> {
		return Promise.resolve(this.challenges[Math.floor(Math.random() * this.challenges.length)]);
	}

	public createNewChallenge(
		challenge: ChallengeDto
	): Promise<ChallengeDto | string> {
		challenge.id = ++this.challengeId;
		this.challenges.push(challenge);
		return Promise.resolve(challenge);
	}

	public getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return Promise.resolve(this.challenges);
	}

	public deleteChallenge(challengeId: number): Promise<ChallengeDto | string> {
		var challenge = null;
		for (var index = 0; index < this.challenges.length; index++) {
			if (this.challenges[index].id === challengeId) {
				challenge = this.challenges[index];
			}
		}
		this.challenges = this.challenges.filter((value, index, arr) => { return value.id != challengeId; }); //TODO don't iterate twice
		return Promise.resolve(challenge);
	}

	public getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.getDailyChallenge();
	}
}
