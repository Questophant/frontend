import { ChallengeDto } from '../../dtos/challenge.dto';
import { FilterChallengesByCategoryNamePipe } from './filter-challenges-by-category-name.pipe';
import { Categories } from '../../dtos/category';

describe('FilterChallengesByCategoryNamePipe', () => {
	const pipe = new FilterChallengesByCategoryNamePipe();
	const challenges: ChallengeDto[] = [
		{
			title: 'challenge 1',
			description: '',
			category: Categories.find((cat) => cat.name === 'eco'),
			durationSeconds: 0,
		},
		{
			title: 'challenge 2',
			description: '',
			category: Categories.find((cat) => cat.name === 'fun'),
			durationSeconds: 0,
		},
		{
			title: 'challenge 3',
			description: '',
			category: Categories.find((cat) => cat.name === 'fun'),
			durationSeconds: 0,
		},
	];

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return all challenges when category userName is null', () => {
		expect(pipe.transform(challenges, null)).toEqual(challenges);
	});

	it('should filter out challenges with different category name', () => {
		expect(pipe.transform(challenges, 'eco')).toEqual([
			{
				title: 'challenge 1',
				description: '',
				category: Categories.find((cat) => cat.name === 'eco'),
				durationSeconds: 0,
			},
		]);
	});
});
