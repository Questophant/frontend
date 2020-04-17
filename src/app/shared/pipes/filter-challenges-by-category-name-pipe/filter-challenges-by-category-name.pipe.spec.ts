import { ChallengeDto } from '../../dtos/challenge.dto';
import { FilterChallengesByCategoryNamePipe } from './filter-challenges-by-category-name.pipe';
import { getCategoryByName } from '../../dtos/category';

describe('FilterChallengesByCategoryNamePipe', () => {
	const pipe = new FilterChallengesByCategoryNamePipe();
	const challenges: ChallengeDto[] = [
		{
			title: 'challenge 1',
			description: '',
			category: getCategoryByName('creative'),
			durationSeconds: 0,
		},
		{
			title: 'challenge 2',
			description: '',
			category: getCategoryByName('cooking'),
			durationSeconds: 0,
		},
		{
			title: 'challenge 3',
			description: '',
			category: getCategoryByName('cooking'),
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
		expect(pipe.transform(challenges, 'creative')).toEqual([
			{
				title: 'challenge 1',
				description: '',
				category: getCategoryByName('creative'),
				durationSeconds: 0,
			},
		]);
	});
});
