export interface CreateChallengeDto {
	title: string;
	description: string;
	category: string;
	// imageUrl: string;
	durationSeconds: number;
	material?: string;
	kind: string;
}
