import { Component, HostListener, OnInit } from '@angular/core';
import {
	Categories,
	Category,
	getCategoryByName,
} from 'src/app/shared/dtos/category';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	challenges: ChallengeDto[];
	dailyChallenge: ChallengeDto;
	categories: Category[] = Categories;
	selectedCategory: Category;
	private pageIndex = 0;
	private pageSize = 10;
	private updateInProgress = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private api: ApiService
	) {
		this.route.queryParamMap.subscribe((params) => {
			const category = getCategoryByName(params.get('category'));

			this.selectedCategory = category ?? null;
			this.getDailyChallenge();
			this.updateChallenges();

			if (!category) {
				// Remove query-param when no valid category selected
				this.setCategoryParam(null);
			}
		});
	}

	ngOnInit(): void {}

	@HostListener('window:scroll', [])
	onScroll(): void {
		if (
			!this.updateInProgress &&
			window.innerHeight + window.scrollY >= document.body.offsetHeight
		) {
			this.updateInProgress = true;
			this.pageIndex++;
			this.api
				.getChallenges(
					this.selectedCategory,
					this.pageIndex,
					this.pageSize
				)
				.then((newChallenges) => {
					this.updateInProgress = false;
					this.challenges = this.challenges.concat(newChallenges);
				});
		}
	}

	setCategory(category: Category): void {
		this.selectedCategory = category;
		this.challenges = [];
		this.updateChallenges();

		this.setCategoryParam(category?.name);
	}

	trackChallenges(index: number, challenge: ChallengeDto): number {
		return challenge.id;
	}

	private setCategoryParam(category: string) {
		this.router
			.navigate([], {
				queryParams: {
					category,
				},
				queryParamsHandling: 'merge',
			})
			.catch((reason) => {
				// No handling needed.
			});
	}

	private updateChallenges() {
		this.api
			.getChallenges(this.selectedCategory, 0, this.pageSize)
			.then((challenges) => {
				if (this.selectedCategory === null) {
					challenges.unshift(this.dailyChallenge);
				}
				this.challenges = challenges;
			});
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
