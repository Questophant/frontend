import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../shared/services/store/store.service';
import { Location } from '@angular/common';
import { ApiService } from '../../shared/services/api-service/api.service';
import { ChallengeState } from '../../shared/dtos/challenge-state.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-challenge-details-page',
	templateUrl: './challenge-details-page.component.html',
	styleUrls: ['./challenge-details-page.component.scss'],
	animations: [
		trigger('inOutAnimation', [
			transition(':enter', [
				style({ display: 'none', visibility: 'hidden' }),
				animate(
					'1s 1s ease-out',
					style({ display: 'block', visibility: 'visible' })
				),
			]),
			transition(':leave', [
				style({ height: 300, opacity: 1 }),
				animate('1s ease-in', style({ height: 0, opacity: 0 })),
			]),
		]),
	],
})
export class ChallengeDetailsPageComponent implements OnInit {
	challenge: Promise<ChallengeDto>;
	showActions: boolean;
	remembered = false;
	running = false;
	success = false;
	failure = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService,
		private store: StoreService,
		private location: Location
	) {
		this.showActions =
			this.route.snapshot.queryParamMap.get('actions') !== 'false';

		this.route.params.subscribe((params) => {
			const id = +params.id;

			api.getChallengeById(id)
				.then((challenge) => {
					if (challenge) {
						this.challenge = Promise.resolve(challenge);
						this.remembered = challenge.marked;
						this.running = challenge.ongoing;
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
			.then((_) =>
				this.api.changeChallengeState(challenge, ChallengeState.ONGOING)
			)
			.then((value) => {
				this.running = true;
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
			.then((_) => {
				this.success = true;
			});
	}

	challengeFailure(challenge: ChallengeDto): void {
		this.api
			.changeChallengeState(challenge, ChallengeState.FAILURE)
			.then((_) => {
				this.failure = true;
			});
	}

	navigateBack() {
		this.location.back();
	}
}
