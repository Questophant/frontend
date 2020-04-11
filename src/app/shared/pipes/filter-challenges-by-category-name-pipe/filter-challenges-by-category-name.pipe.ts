import { Pipe, PipeTransform } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';

@Pipe({
	name: 'filterChallengesByCategoryName',
})
export class FilterChallengesByCategoryNamePipe implements PipeTransform {
	transform(
		challenges: ChallengeDto[],
		categoryName: string
	): ChallengeDto[] {
		if (categoryName == null) {
			return challenges;
		}

		return challenges.filter(
			(challenge) => challenge.category === categoryName
		);
	}
}
