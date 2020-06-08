import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { PointsDto } from '../../shared/dtos/points.dto';
import { UserDto } from '../../shared/dtos/user.dto';
import { ApiService } from '../../shared/services/api/api.service';
import { StoreService } from '../../shared/services/store/store.service';
import { UrlResolverService } from '../../shared/services/url/url-resolver.service';

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

	constructor(
		private api: ApiService,
		private router: Router,
		private store: StoreService,
		private urlResolverService: UrlResolverService
	) {
		this.user$ = api.getMyUser(store.getUserId());
		this.points$ = api.getPointsOfUser();
	}

	ngOnInit(): void { }

	toggleRules(): void {
		this.showRules = !this.showRules;
	}

	toggleDataPrivacy(): void {
		this.showDataPrivacy = !this.showDataPrivacy;
	}

	toggleImprint(): void {
		this.showImprint = !this.showImprint;
	}

	getProfilePicture(user: UserDto): string {
		return this.urlResolverService.getProfilePicture(user, '.' +
			window.document.body.clientWidth +
			'x' +
			window.document.body.clientHeight);
	}

	openProfilePictureEditor(): void {
		this.router.navigate(['/uploadProfilePicture']);
	}
}
