import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories, Category } from 'src/app/shared/dtos/category';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	challenges: ChallengeDto[];
	dailyChallenge: ChallengeDto;
	categories: Category[] = Categories;
	selectedCategory: Category = null;
	private pageIndex = 0;
	private pageSize = 10;
	private updateInProgress = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private api: ApiService
	) {
		this.getDailyChallenge();
		this.updateChallenges();
	}

	ngOnInit(): void {}

	setCategory(category: Category): void {
		this.selectedCategory = category;
		this.challenges = [];
		this.updateChallenges();
	}

	trackChallenges(index: number, challenge: ChallengeDto): number {
		return challenge.id;
	}

	@HostListener('window:scroll', [])
	private onScroll(): void {
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

	private updateChallenges(): void {
		this.api
			.getChallenges(this.selectedCategory, 0, this.pageSize)
			.then((challenges) => {
				if (this.selectedCategory === null) {
					challenges.unshift(this.dailyChallenge);
				}
				this.challenges = challenges;
			});
	}

	private getDailyChallenge(): void {
		this.api.getDailyChallenge().then((challenge) => {
			challenge.category = {
				name: 'daily',
				display: 'Quest des Tages',
			};
			this.dailyChallenge = challenge;
		});
	}
}
