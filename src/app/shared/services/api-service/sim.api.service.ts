import { Injectable } from '@angular/core';
import { Categories, Category } from '../../dtos/category';
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
		category: Categories.find((cat) => cat.name === 'art'),
		durationSeconds: 300,
	};

	private challenges: ChallengeDto[] = [
		{
			id: 1,
			title: 'Challenge 1',
			category: Categories.find((cat) => cat.name === 'art'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 30,
		},
		{
			id: 2,
			title: 'Challenge 2',
			category: Categories.find((cat) => cat.name === 'cooking'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 60,
		},
		{
			id: 3,
			title: 'Challenge 3',
			category: Categories.find((cat) => cat.name === 'social'),
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

	async createNewUser(): Promise<UserDto> {
		return this.newUserId;
	}

	async updateUser(userId: string, user: UserDto): Promise<UserDto> {
		user.userId = userId;
		return user;
	}

	async getAllChallenges(): Promise<ChallengeDto[]> {
		return this.challenges;
	}

	async getAllChallengesOfUser(): Promise<ChallengeDto[]> {
		return this.challenges;
	}

	async getDailyChallenge(): Promise<ChallengeDto> {
		return this.dailyChallenge;
	}

	async getRandomChallenge(category: Category): Promise<ChallengeDto> {
		return this.challenges[
			Math.floor(Math.random() * this.challenges.length)
		];
	}

	async createNewChallenge(challenge: ChallengeDto): Promise<ChallengeDto> {
		challenge.id = this.challenges.length + 1;
		this.challenges.push(challenge);

		return challenge;
	}

	async deleteChallenge(challengeId: number): Promise<ChallengeDto> {
		const challenge = this.challenges.find((c) => c.id === challengeId);

		if (challenge === undefined) {
			return Promise.reject('Challenge does not exist');
		}

		this.challenges = this.challenges.filter((c) => c.id !== challengeId);
		return challenge;
	}
}
