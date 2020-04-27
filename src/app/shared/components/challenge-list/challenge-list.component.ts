import { Component, Input, OnInit } from '@angular/core';
import { ChallengeDto } from '../../dtos/challenge.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-challenge-list',
	templateUrl: './challenge-list.component.html',
	styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit {
	@Input() challenges: Promise<ChallengeDto[]>;
	@Input() showActions? = true;

	constructor(private router: Router) {}

	ngOnInit(): void {}
}
