import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
	ChallengeListType,
	ChallengeListTypes,
	getChallengeListTypeByName,
} from 'src/app/shared/dtos/challenge-list-type';
import { ChallengeDto } from '../../shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api/api.service';

@Component({
	selector: 'app-challenge-list-page',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit, OnDestroy {
	challenges$: Promise<ChallengeDto[]>;

	challengeListTypes: ChallengeListType[] = ChallengeListTypes;
	challengeListType: ChallengeListType;
	subscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private api: ApiService
	) {}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.route.queryParamMap.subscribe((params) => {
			const tab = params.get('tab') || 'active';

			if (tab !== '') {
				this.challengeListType = getChallengeListTypeByName(tab);
			} else
				this.challengeListType = getChallengeListTypeByName('active');

			this.challenges$ = this.api.getChallengeList(
				this.challengeListType,
				0,
				Number.MAX_VALUE
			);
		});
	}

	showChallenges(name: string): void {
		this.challengeListType = getChallengeListTypeByName(name);

		this.router.navigate([], {
			queryParams: { tab: name },
			skipLocationChange: true,
		});
	}
}
