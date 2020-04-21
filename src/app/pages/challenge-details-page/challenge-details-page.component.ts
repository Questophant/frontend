import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../shared/services/store/store.service';
import { Location } from '@angular/common';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-challenge-details-page',
	templateUrl: './challenge-details-page.component.html',
	styleUrls: ['./challenge-details-page.component.scss'],
})
export class ChallengeDetailsPageComponent implements OnInit {
	challenge: ChallengeDto;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService,
		private store: StoreService,
		private location: Location
	) {
		this.route.params.subscribe((params) => {
			const id = +params.id;

			api.getChallengeById(id)
				.then((challenge) => {
					if (challenge) {
						this.challenge = challenge;
					} else {
						this.router.navigate(['']);
					}
				})
				.catch((reason) => this.router.navigate(['']));
		});
	}

	ngOnInit(): void {}

	acceptChallenge(challenge: ChallengeDto): void {
		this.store.addAcceptedChallenge(challenge);
	}

	rememberChallenge(challenge: ChallengeDto): void {
		this.store.addRememberedChallenge(challenge);
	}

	navigateBack() {
		this.location.back();
	}
}
