/* export enum Category {
	HOUSEHOLD = 'household',
	PHYSICAL = 'physical',
	SELFCARE = 'selfcare',
	ECO = 'eco',
	FUN = 'fun',
	EDUCATION = 'education',
	SOCIAL = 'social',
	COOKING = 'cooking',
	NOCOMFORT = 'noComfortZone',
	CREATIVE = 'creative',
} */

export const Categories: Category[] = [
	{ name: 'home', display: '@ home' },
	{ name: 'cooking', display: 'Roberts Koch-Institut' },
	{ name: 'creative', display: 'Kreativer Kopf' },
	{ name: 'know-how', display: 'Know-How?' },
	{ name: 'move', display: 'Move, move, move!' },
	{ name: 'selfcare', display: 'Do it for Yourself' },
	{ name: 'social', display: 'MenschenKontakt' },
	{ name: 'comfort', display: 'Raus aus der Komfort-Zone!' },
];

export function getCategoryByName(name: string): Category | undefined {
	return Categories.find((c) => c.name === name);
}

export interface Category {
	name: string;
	display: string;
}
