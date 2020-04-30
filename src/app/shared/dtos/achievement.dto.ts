export interface AchievementDto {
	achievmentsByCategory: { [category: string]: Achievement[] }[];
	overalLevel: Achievement[];
}

export interface Achievement {
	name: string;
	imageUrl: string;
	achieved: boolean;
}
