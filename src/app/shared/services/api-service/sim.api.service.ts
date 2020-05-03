import { Injectable } from '@angular/core';
import { AchievementDto } from '../../dtos/achievement.dto';
import { Category, getCategoryByName } from '../../dtos/category';
import { ChallengeState } from '../../dtos/challenge-state.enum';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { PointsDto } from '../../dtos/points.dto';
import { UserDto } from '../../dtos/user.dto';
import { StoreService } from '../store/store.service';
import { ApiService } from './api.service';

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
		createdBy: 'Annete',
		material: 'Farben, Pinsel',
		pointsLoose: 0,
		pointsWin: 0,
		ongoing: false,
		marked: false,
	};

	private rememberedChallenges: ChallengeDto[] = [];
	private createdChallenges: ChallengeDto[] = [];
	private doneChallenges: ChallengeDto[] = [];
	private activeChallenges: ChallengeDto[] = [];

	private challenges: ChallengeDto[] = [
		{
			id: 1,
			title: 'Quest 1',
			category: getCategoryByName('creative'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 30,
			createdBy: 'AnneteB',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
		{
			id: 2,
			title: 'Quest 2',
			category: getCategoryByName('cooking'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 60,
			createdBy: 'Markus',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
		{
			id: 3,
			title: 'Quest 3',
			category: getCategoryByName('social'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
			createdBy: 'Gerhard99',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
		{
			id: 4,
			title: 'Quest 4',
			category: getCategoryByName('physical'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
			createdBy: 'IngeBinge',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
		{
			id: 5,
			title: 'Quest 5',
			category: getCategoryByName('selfcare'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
			createdBy: 'Kastanienblüte',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
		{
			id: 6,
			title: 'Quest 6',
			category: getCategoryByName('education'),
			description:
				'Einfach eine einfache Beschreibung um einfach mal was zu sagen.',
			durationSeconds: 300,
			createdBy: 'Markus',
			material: null,
			pointsLoose: 0,
			pointsWin: 0,
			ongoing: false,
			marked: false,
		},
	];

	private achievements: AchievementDto = {
		achievmentsByCategory: {
			household: [
				{
					name: 'Heimscheisser',
					imageUrl: '',
					achieved: true,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			social: [
				{
					name: 'Einsiedlereule',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			physical: [
				{
					name: 'Couch-Potatoe',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			selfcare: [
				{
					name: 'Einstiegsyogi',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			cooking: [
				{
					name: 'Tellerwäscher',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			noComfortZone: [
				{
					name: 'Schnabeltassennutzer',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			creative: [
				{
					name: 'Tuschkastenvergesser',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
			education: [
				{
					name: 'Ich-mag-Toastbrot!',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
				{
					name: '',
					imageUrl: '',
					achieved: false,
				},
			],
		},
		overalLevel: [
			{
				name: 'Holzmedaille',
				imageUrl: '',
				achieved: false,
			},
			{
				name: '',
				imageUrl: '',
				achieved: false,
			},
			{
				name: '',
				imageUrl: '',
				achieved: false,
			},
			{
				name: '',
				imageUrl: '',
				achieved: false,
			},
			{
				name: '',
				imageUrl: '',
				achieved: false,
			},
		],
	};

	private testUser: UserDto = {
		userName: 'TestUser',
		publicUserId: 'someUserId',
		privateUserId: 'privateUserId',
	};

	constructor(private store: StoreService) {}

	async createNewUser(user: UserDto): Promise<UserDto> {
		if (user.userName === 'existingUserName') {
			return Promise.reject('Username is already in use');
		}
		return {
			publicUserId: 'anyUserId',
			privateUserId: 'privateUserId',
			userName: user.userName,
		};
	}

	async getChallenges(
		category: Category,
		page: number,
		size: number
	): Promise<ChallengeDto[]> {
		if (!category) {
			return this.challenges.slice();
		}
		return this.challenges
			.filter((challenge) => challenge.category.name === category.name)
			.slice();
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

	async getChallengeById(id: number): Promise<ChallengeDto> {
		return this.challenges.find((challenge) => challenge.id === id);
	}

	async getChallengesForUser(userId: string): Promise<ChallengeDto[]> {
		return this.challenges;
	}

	async getUser(userId: string): Promise<UserDto> {
		return this.testUser;
	}

	changeChallengeState(
		challenge: ChallengeDto,
		state: ChallengeState
	): Promise<void> {
		switch (state) {
			case ChallengeState.FAILURE:
				challenge.ongoing = false;
				this.doneChallenges.push(challenge);
				break;
			case ChallengeState.ONGOING:
				challenge.ongoing = true;
				this.activeChallenges.push(challenge);
				break;
			case ChallengeState.SUCCESS:
				challenge.ongoing = false;
				this.doneChallenges.push(challenge);
				break;
			default:
				this.doneChallenges = this.doneChallenges.filter(
					(c) => c.id === challenge.id
				);
				this.activeChallenges = this.activeChallenges.filter(
					(c) => c.id !== challenge.id
				);
				challenge.ongoing = false;
		}
		return;
	}

	async getActiveChallenges(): Promise<ChallengeDto[]> {
		return this.activeChallenges;
	}

	async getCreatedChallenges(): Promise<ChallengeDto[]> {
		return this.createdChallenges;
	}

	async getDoneChallenges(): Promise<ChallengeDto[]> {
		return this.doneChallenges;
	}

	async getRememberedChallenges(): Promise<ChallengeDto[]> {
		return this.rememberedChallenges;
	}

	async rememberChallenge(
		challenge: ChallengeDto,
		remember: boolean
	): Promise<ChallengeDto> {
		if (remember) {
			challenge.marked = true;
			this.rememberedChallenges.push(challenge);
		} else {
			challenge.marked = false;
			this.rememberedChallenges = this.rememberedChallenges.filter(
				(c) => c.id !== challenge.id
			);
		}
		return challenge;
	}

	async getPointsOfUser(): Promise<PointsDto> {
		return { points: 10 };
	}

	async getAchievementsForUser(id: string): Promise<AchievementDto> {
		return this.achievements;
	}

	public getDefaultExceptionHandler() {
		// NO OP
	}
}
