import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api/api.service';

@Component({
	selector: 'app-challenge-list-page',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;

	showActive = true;
	showMarked = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService
	) {
		this.route.queryParamMap.subscribe((params) => {
			const tab = params.get('tab') || 'active';

			if (tab === 'active') {
				this.showActiveChallenges();
			} else if (tab === 'marked') {
				this.showMarkedChallenges();
			}
		});
	}

	ngOnInit(): void {}

	showMarkedChallenges(): void {
		this.showActive = false;
		this.showMarked = true;
		this.challenges$ = this.api.getRememberedChallenges();

		this.router.navigate([], {
			queryParams: { tab: 'marked' },
			skipLocationChange: true,
		});
	}

	showActiveChallenges(): void {
		this.showActive = true;
		this.showMarked = false;
		this.challenges$ = this.api.getActiveChallenges();

		this.router.navigate([], {
			queryParams: { tab: 'active' },
			skipLocationChange: true,
		});
	}
}
