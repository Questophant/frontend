import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { StoreService } from '../../shared/services/store/store.service';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-challenge-list-page',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit {
	showProgress = false;
	challenges$: Promise<ChallengeDto[]>;

	constructor(
		private route: ActivatedRoute,
		private store: StoreService,
		private api: ApiService
	) {
		this.route.data.subscribe((v) => {
			this.showProgress = v.showProgress;
			let challengeIds = [];

			if (this.showProgress) {
				challengeIds = store.getAcceptedChallenges();
			} else {
				challengeIds = store.getRememberedChallenges();
			}

			this.challenges$ = Promise.all(
				challengeIds.map((id) => api.getChallengeById(id))
			);
		});
	}

	ngOnInit(): void {}
}
