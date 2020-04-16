import { Component, OnInit } from '@angular/core';
import { Categories, Category } from 'src/app/shared/dtos/category';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;
	categories: Category[] = Categories;
	filter: string;

	constructor(private api: ApiService) {
		this.challenges$ = api.getAllChallenges();
	}

	ngOnInit(): void {}

	setCategoryFilter(name: string): void {
		this.filter = name;
	}
}
