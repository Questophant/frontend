import { ChallengeDto } from '../../dtos/challenge.dto';
import { FilterChallengesByCategoryNamePipe } from './filter-challenges-by-category-name.pipe';

describe('FilterChallengesByCategoryNamePipe', () => {
	const pipe = new FilterChallengesByCategoryNamePipe();
	const challenges: ChallengeDto[] = [
		{
			title: 'challenge 1',
			description: '',
			category: 'art',
			durationSeconds: 0,
		},
		{
			title: 'challenge 2',
			description: '',
			category: 'fun',
			durationSeconds: 0,
		},
		{
			title: 'challenge 3',
			description: '',
			category: 'fun',
			durationSeconds: 0,
		},
	];

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return all challenges when category name is null', () => {
		expect(pipe.transform(challenges, null)).toEqual(challenges);
	});

	it('should filter out challenges with different category name', () => {
		expect(pipe.transform(challenges, 'art')).toEqual([
			{
				title: 'challenge 1',
				description: '',
				category: 'art',
				durationSeconds: 0,
			},
		]);
	});
});
