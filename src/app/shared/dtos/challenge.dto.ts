import { Category } from './category';

export interface ChallengeDto {
	id?: number;
	title: string;
	description: string;
	category: Category;
	imageUrl?: string;
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
	durationSeconds: number;
	createdByUserName: string;
	pointsLoose: number;
	pointsWin: number;
	material?: string;
}
