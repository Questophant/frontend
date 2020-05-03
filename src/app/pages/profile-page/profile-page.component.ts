import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';
import { Router } from '@angular/router';
import { StoreService } from '../../shared/services/store/store.service';
import { UserDto } from '../../shared/dtos/user.dto';
import { PointsDto } from '../../shared/dtos/points.dto';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;
	points$: Promise<PointsDto>;
	user$: Promise<UserDto>;

	showDataPrivacy = false;
	showRules = false;
	showImprint = false;

	showDoneChallenges = true;
	showCreatedChallenges = false;

	constructor(
		private api: ApiService,
		private router: Router,
		private store: StoreService
	) {
		this.user$ = api.getUser(store.getUserId());
		this.points$ = api.getPointsOfUser();
		this.displayDoneChallenges();
	}

	ngOnInit(): void {}

	toggleRules(): void {
		this.showRules = !this.showRules;
	}

	toggleDataPrivacy(): void {
		this.showDataPrivacy = !this.showDataPrivacy;
	}

	toggleImprint(): void {
		this.showImprint = !this.showImprint;
	}

	displayDoneChallenges(): void {
		this.showDoneChallenges = true;
		this.showCreatedChallenges = false;
		this.challenges$ = this.api.getDoneChallenges();
	}

	displayCreatedChallenges(): void {
		console.log('hello');
		this.showDoneChallenges = false;
		this.showCreatedChallenges = true;
		this.challenges$ = this.api.getCreatedChallenges();
	}
}
