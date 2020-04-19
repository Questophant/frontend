import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-challenge-list',
	templateUrl: './challenge-list-page.component.html',
	styleUrls: ['./challenge-list-page.component.scss'],
})
export class ChallengeListPageComponent implements OnInit {
	showProgress = false;

	constructor(private route: ActivatedRoute) {
		this.route.data.subscribe((v) => (this.showProgress = v.showProgress));
	}

	ngOnInit(): void {}
}
