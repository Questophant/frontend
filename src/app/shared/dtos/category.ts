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
	{ name: 'household', display: 'Haushalt' },
	{ name: 'physical', display: 'Sport' },
	{ name: 'selfcare', display: 'Selbstpflege' },
	{ name: 'eco', display: 'Umwelt' },
	{ name: 'fun', display: 'Spaß' },
	{ name: 'education', display: 'Bildung' },
	{ name: 'social', display: 'Sozial' },
	{ name: 'cooking', display: 'Kochen' },
	{ name: 'noComfortZone', display: 'Komfortzone' },
	{ name: 'creative', display: 'Kreativ' },
];

export interface Category {
	name: string;
	display: string;
}
