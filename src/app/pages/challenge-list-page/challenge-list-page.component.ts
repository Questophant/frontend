import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-challenge-list-page',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit {
	showProgress = false;
	challenges$: Promise<ChallengeDto[]>;

	constructor(private route: ActivatedRoute, private api: ApiService) {
		this.route.data.subscribe((v) => {
			this.showProgress = v.showProgress;

			if (this.showProgress) {
				this.challenges$ = this.api.getActiveChallenges();
			} else {
				this.challenges$ = this.api.getRememberedChallenges();
			}
		});
	}

	ngOnInit(): void {}
}
