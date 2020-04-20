import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { StoreService } from '../../shared/services/store/store.service';

@Component({
	selector: 'app-challenge-list-page',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit {
	showProgress = false;
	challenges$: Promise<ChallengeDto[]>;

	constructor(private route: ActivatedRoute, private store: StoreService) {
		this.route.data.subscribe((v) => {
			this.showProgress = v.showProgress;

			if (this.showProgress) {
				this.challenges$ = Promise.resolve(
					store.getAcceptedChallenges()
				);
			} else {
				this.challenges$ = Promise.resolve(
					this.store.getRememberedChallenges()
				);
			}
		});
	}

	ngOnInit(): void {}
}
