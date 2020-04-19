import { Injectable } from '@angular/core';
import { Category, getCategoryByName } from '../../dtos/category';
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
		category: getCategoryByName('art'),
		durationSeconds: 300,
	};

	private challenges: ChallengeDto[] = [
		{
			id: 1,
			title: 'Challenge 1',
			category: getCategoryByName('creative'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 30,
		},
		{
			id: 2,
			title: 'Challenge 2',
			category: getCategoryByName('cooking'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 60,
		},
		{
			id: 3,
			title: 'Challenge 3',
			category: getCategoryByName('social'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
		},
		{
			id: 4,
			title: 'Challenge 4',
			category: getCategoryByName('physical'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
		},
		{
			id: 5,
			title: 'Challenge 5',
			category: getCategoryByName('selfcare'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
		},
		{
			id: 6,
			title: 'Challenge 6',
			category: getCategoryByName('education'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
		},
	];

	constructor(private store: StoreService) {}

	async createNewUser(user: UserDto): Promise<UserDto> {
		if (user.userName === 'existingUserName') {
			return Promise.reject('Username is already in use');
		}
		return {
			userId: 'anyUserId',
			userName: user.userName,
		};
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
