import { Component, OnInit } from '@angular/core';
import { AchievementDto } from '../../shared/dtos/achievement.dto';
import { Category, getCategoryByName } from '../../shared/dtos/category';
import { ApiService } from '../../shared/services/api/api.service';
import { StoreService } from '../../shared/services/store/store.service';

@Component({
	selector: 'app-achievements-page',
	templateUrl: './achievements-page.component.html',
	styleUrls: ['./achievements-page.component.scss'],
})
export class AchievementsPageComponent implements OnInit {
	achievements$: Promise<AchievementDto>;
	categories: string[];

	constructor(private api: ApiService, private store: StoreService) {
		this.achievements$ = this.api
			.getAchievementsForUser(this.store.getPublicUserId())
			.then((value) => {
				this.categories = Object.keys(value.achievmentsByCategory);
				return value;
			});
	}

	ngOnInit(): void {}

	categoryName(key: string): Category {
		return getCategoryByName(key);
	}
}
