import { Injectable } from '@angular/core';
import { Category } from '../../dtos/category';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { ApiService } from './api.service';
import { UserDto } from '../../dtos/user.dto';
import { StoreService } from '../store/store.service';

@Injectable()
/**
 * This API Service simulates a backend.
 */
export class SimApiService implements ApiService {
	private readonly dailyChallenge: ChallengeDto = {
		id: 0,
		title: 'asdasdasd',
		description: 'lorem ipsum ...',
		category: 'art',
		durationSeconds: 300,
	};

	private challenges: ChallengeDto[] = [
		{
			id: 1,
			title: 'Challenge 1',
			category: 'art',
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 30,
		},
		{
			id: 2,
			title: 'Challenge 2',
			category: 'cooking',
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 60,
		},
		{
			id: 3,
			title: 'Challenge 3',
			category: 'social',
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
		},
	];

	private newUserId: UserDto = {
		userId: 'anyUserId',
		userName: null,
	};

	constructor(private store: StoreService) {}

	async getAllChallenges(): Promise<ChallengeDto[]> {
		return this.challenges;
	}

	async getDailyChallenge(): Promise<ChallengeDto> {
		return this.dailyChallenge;
	}

	async createNewUser(): Promise<UserDto> {
		return this.newUserId;
	}

	async updateUser(userId: string, user: UserDto): Promise<UserDto> {
		user.userId = userId;
		return user;
	}

	public getDailyChallenge(): Promise<ChallengeDto> {
		return Promise.resolve(
			this.challenges[Math.floor(Math.random() * this.challenges.length)]
		);
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

	public deleteChallenge(
		challengeId: number
	): Promise<ChallengeDto | string> {
		var challenge = null;
		for (var index = 0; index < this.challenges.length; index++) {
			if (this.challenges[index].id === challengeId) {
				challenge = this.challenges[index];
			}
		}
		this.challenges = this.challenges.filter((value, index, arr) => {
			return value.id != challengeId;
		}); //TODO don't iterate twice
		return Promise.resolve(challenge);
	}

	public getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.getDailyChallenge();
	}
}
