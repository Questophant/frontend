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
	challenge: Promise<ChallengeDto>;
	remembered = false;
	accepted = false;

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
						this.challenge = Promise.resolve(challenge);
						this.remembered =
							this.store
								.getRememberedChallenges()
								.indexOf(challenge.id) > -1;
						this.accepted =
							this.store
								.getAcceptedChallenges()
								.indexOf(challenge.id) > -1;
					} else {
						this.router.navigate(['']);
					}
				})
				.catch((reason) => this.router.navigate(['']));
		});
	}

	ngOnInit(): void {}

	acceptChallenge(challenge: ChallengeDto): void {
		this.store.removeRememberedChallenge(challenge.id);
		this.store.addAcceptedChallenge(challenge.id);
		this.accepted = true;
	}

	toggleRemember(challenge: ChallengeDto): void {
		if (this.remembered) {
			this.store.removeRememberedChallenge(challenge.id);
			this.remembered = false;
		} else {
			this.store.addRememberedChallenge(challenge.id);
			this.remembered = true;
		}
	}

	navigateBack() {
		this.location.back();
	}
}
