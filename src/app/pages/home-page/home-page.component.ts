import { Component, OnInit } from '@angular/core';
import { Categories, Category } from 'src/app/shared/dtos/category';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-select-challenge-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;
	categories: Category[] = Categories;
	filter: string;

	constructor(private api: ApiService) {
		this.challenges$ = Promise.all([
			api.getAllChallenges(),
			api.getDailyChallenge(),
		]).then((value) => {
			const [allChallenges, dailyChallenge] = value;
			dailyChallenge.category = {
				name: 'daily',
				display: 'Tageschallenge',
			};
			allChallenges.unshift(dailyChallenge);
			return allChallenges;
		});
	}

	ngOnInit(): void {}

	setCategoryFilter(name: string): void {
		this.filter = name;
	}
}
