import { Category } from './category';
import { ChallengeState } from './challenge-state.enum';

export interface ChallengeDto {
	id?: number;
	title: string;
	description: string;
	category: Category;
	imageUrl?: string;
	state?: ChallengeState;
	durationSeconds: number;
	createdBy: string;
	pointsLoose: number;
	pointsWin: number;
	material?: string;
}

export interface ChallengeResponse {
	id?: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	state: string;
	durationSeconds: number;
	createdByUserName: string;
	pointsLoose: number;
	pointsWin: number;
	material?: string;
}
