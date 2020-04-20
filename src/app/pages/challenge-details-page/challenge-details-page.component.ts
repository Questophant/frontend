import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StoreService } from '../../shared/services/store/store.service';

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
		private store: StoreService
	) {
		this.route.paramMap
			.pipe(map(() => window.history.state))
			.subscribe((data) => {
				if (!data.challenge) {
					this.router.navigate(['']);
				}
				this.challenge = data.challenge;
			});
	}

	ngOnInit(): void {}

	acceptChallenge(challenge: ChallengeDto): void {}

	rememberChallenge(challenge: ChallengeDto): void {
		this.store.addRememberedChallenge(challenge);
	}
}
