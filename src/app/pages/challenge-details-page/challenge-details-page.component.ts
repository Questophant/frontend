import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeState } from '../../shared/dtos/challenge-state.enum';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api/api.service';
import { StoreService } from '../../shared/services/store/store.service';
import { UserDto } from '../../shared/dtos/user.dto';
import { UrlResolverService } from '../../shared/services/url/url-resolver.service';

@Component({
	selector: 'app-challenge-details-page',
	templateUrl: './challenge-details-page.component.html',
	styleUrls: ['./challenge-details-page.component.scss'],
	animations: [
		trigger('inOutAnimation', [
			transition(':enter', [
				style({ opacity: 0, 'pointer-events': 'none' }),
				animate(
					'1s ease-in-out',
					style({ opacity: 1, 'pointer-events': 'all' })
				),
			]),
		]),
	],
})
export class ChallengeDetailsPageComponent implements OnInit {
	challenge: Promise<ChallengeDto>;
	createdByUser: Promise<UserDto>;
	showActions: boolean;
	remembered: boolean;
	running: boolean;
	success = false;
	failure = false;
	animations = true;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService,
		private store: StoreService,
		private location: Location,
		private urlResolverService: UrlResolverService
	) {
		this.showActions =
			this.route.snapshot.queryParamMap.get('actions') !== 'false';

		this.route.params.subscribe((params) => {
			const id = +params.id;

			api.getChallengeById(id).then((challenge) => {
				if (challenge) {
					this.createdByUser = this.api.getPublicUserProfile(
						challenge.createdByPublicUserId
					);

					this.challenge = Promise.resolve(challenge);
					this.remembered = challenge.marked;
					this.running = challenge.ongoing;
					if (this.running) {
						this.animations = false;
					}
				} else {
					this.router.navigate(['']);
				}
			});
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

	navigateBack(): void {
		this.location.back();
	}

	getProfilePicture(user: UserDto): string {
		const element = document.getElementsByClassName('profilepic')[0];
		return this.urlResolverService.getProfilePicture(
			user,
			'.' + element.clientWidth + 'x' + element.clientHeight
		);
	}
}
