import { Component, OnInit } from '@angular/core';
import { Categories } from '../../shared/dtos/category';

@Component({
	selector: 'app-achievements-page',
	templateUrl: './achievements-page.component.html',
	styleUrls: ['./achievements-page.component.scss'],
})
export class AchievementsPageComponent implements OnInit {
	categories = Categories;

	constructor() {}

	ngOnInit(): void {}

	comingSoon: boolean = true;
}
