import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../shared/services/store/store.service';
import { Location } from '@angular/common';
import { ApiService } from '../../shared/services/api-service/api.service';
import { ChallengeState } from '../../shared/dtos/challenge-state.enum';

@Component({
	selector: 'app-challenge-details-page',
	templateUrl: './challenge-details-page.component.html',
	styleUrls: ['./challenge-details-page.component.scss'],
})
export class ChallengeDetailsPageComponent implements OnInit {
	challenge: Promise<ChallengeDto>;
	remembered = false;
	accepted = false;
	success = false;
	failure = false;

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
		this.api
			.rememberChallenge(challenge, false)
			.then((c) =>
				this.api.changeChallengeState(c, ChallengeState.ONGOING)
			)
			.then((value) => {
				this.accepted = true;
			});
	}

	toggleRemember(challenge: ChallengeDto): void {
		if (this.remembered) {
			this.api.rememberChallenge(challenge, false).then((value) => {
				this.remembered = false;
			});
		} else {
			this.api.rememberChallenge(challenge, true).then((value) => {
				this.remembered = true;
			});
		}
	}

	challengeSuccess(challenge: ChallengeDto): void {
		this.api
			.changeChallengeState(challenge, ChallengeState.SUCCESS)
			.then((value) => {
				this.success = true;
			});
	}

	challengeFailure(challenge: ChallengeDto): void {
		this.api
			.changeChallengeState(challenge, ChallengeState.FAILURE)
			.then((value) => {
				this.failure = true;
			});
	}

	navigateBack() {
		this.location.back();
	}
}
