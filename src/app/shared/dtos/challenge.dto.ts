import { Category } from './category';

export interface ChallengeDto {
	id?: number;
	title: string;
	description: string;
	category: Category;
	imageUrl?: string;
	durationSeconds: number;
	createdByPublicUserId: string;
	createdByUserName: string;
	material?: string;
	pointsLoose: number;
	pointsWin: number;
	ongoing: boolean;
	marked: boolean;
}

export interface ChallengeResponse {
	id?: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	durationSeconds: number;
	createdByPublicUserId: string;
	createdByUserName: string;
	pointsLoose: number;
	pointsWin: number;
	material?: string;
	ongoing: boolean;
	marked: boolean;
}
