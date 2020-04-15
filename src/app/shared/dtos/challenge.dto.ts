import { Category } from './category';

export interface ChallengeDto {
	id?: number;
	title: string;
	description: string;
	category: Category;
	durationSeconds: number;
}

export interface ChallengeResponse {
	id?: number;
	title: string;
	description: string;
	category: string;
	durationSeconds: number;
}
