import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from 'src/app/shared/services/api-service/api.service';

@Component({
	selector: 'app-select-challenge-page',
	templateUrl: './select-challenge-page.component.html',
	styleUrls: ['./select-challenge-page.component.scss'],
})
export class SelectChallengePageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;

	constructor(private api: ApiService) {
		this.challenges$ = api.getAllChallenges();
	}

	ngOnInit(): void {}
}
