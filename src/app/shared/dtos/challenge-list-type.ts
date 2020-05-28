export const ChallengeListTypes: ChallengeListType[] = [
	{ name: 'active', display: 'Laufend' },
	{ name: 'marked', display: 'Gemerkt' },
	{ name: 'done', display: 'Absolviert' },
	{ name: 'created', display: 'Erstellt' },
];

export function getChallengeListTypeByName(name: string): ChallengeListType | undefined {
	return ChallengeListTypes.find((c) => c.name === name);
}

export interface ChallengeListType {
	name: string;
	display: string;
}
