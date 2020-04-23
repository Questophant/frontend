import { Component, HostListener, OnInit } from '@angular/core';
import { Categories, Category } from 'src/app/shared/dtos/category';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';
import { forkJoin, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-select-challenge-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	challenges$: Observable<ChallengeDto[]>;
	categories: Category[] = Categories;
	selectedCategory: Category = null;
	dailyChallenge: ChallengeDto;
	pageIndex = 0;
	pageSize = 10;

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

	@HostListener('window:scroll', [])
	onScroll(): void {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			this.pageIndex++;
			const scrollY = window.innerHeight + window.scrollY;
			this.challenges$ = forkJoin([
				this.challenges$,
				this.api.getChallenges(
					this.selectedCategory,
					this.pageIndex,
					this.pageSize
				),
			]).pipe(
				map(([a, b]) => {
					return a.concat(b);
				})
			);
			document.getElementsByClassName('challenge')[
				this.pageSize * 10
			].scrollTop = scrollY;
		}
	}

	private updateChallenges() {
		this.challenges$ = from(
			this.api
				.getChallenges(this.selectedCategory, 0, this.pageSize)
				.then((challenges) => {
					if (this.selectedCategory === null) {
						challenges.unshift(this.dailyChallenge);
					}
					return challenges;
				})
		);
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
