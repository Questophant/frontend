import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-select-challenge-page',
	templateUrl: './select-challenge-page.component.html',
	styleUrls: ['./select-challenge-page.component.scss'],
})
export class SelectChallengePageComponent implements OnInit {
	challenges: {
		id: string;
		name: string;
		category: string;
		member: number;
	}[] = [
		{
			id: 'challenge-1',
			name: 'Räum mal auf',
			category: 'Haushalt',
			member: 200,
		},
	];

	constructor() {}

	ngOnInit(): void {}
}
