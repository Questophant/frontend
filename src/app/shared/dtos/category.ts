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
	{ name: 'household', display: '@ home' },
	{ name: 'physical', display: 'Move, move, move!' },
	{ name: 'education', display: 'Know-How?' },
	{ name: 'selfcare', display: 'Do it for Yourself' },
	{ name: 'comfort', display: 'Raus aus der Komfort-Zone!' },
	{ name: 'social', display: 'Wir - Voll sozial' },
	{ name: 'cooking', display: 'Roberts Koch-Institut' },
	{ name: 'creative', display: 'Kreativer Kopf' },
];

export function getCategoryByName(name: string): Category | undefined {
	return Categories.find((c) => c.name === name);
}

export interface Category {
	name: string;
	display: string;
}
