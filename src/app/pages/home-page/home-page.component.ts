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
	selectedCategory: Category = null;
	dailyChallenge: ChallengeDto;

	constructor(private api: ApiService) {
		this.getDailyChallenge();
		this.updateChallenges();
	}

	ngOnInit(): void {}

	setCategory(category: Category): void {
		this.selectedCategory = category;
		this.challenges$ = undefined;
		this.updateChallenges();
	}

	private updateChallenges() {
		setTimeout(() => {
			this.challenges$ = this.api
				.getChallenges(this.selectedCategory)
				.then((challenges) => {
					if (this.selectedCategory === null) {
						challenges.unshift(this.dailyChallenge);
					}
					return challenges;
				});
		}, 1000);
	}

	private getDailyChallenge() {
		this.api.getDailyChallenge().then((challenge) => {
			challenge.category = {
				name: 'daily',
				display: 'Tageschallenge',
			};
			this.dailyChallenge = challenge;
		});
	}
}
