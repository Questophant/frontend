import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { SimApiService } from 'src/app/shared/services/api-service/sim.api.service';
import { HomePageComponent } from './home-page.component';
import { FilterChallengesByCategoryNamePipe } from '../../shared/pipes/filter-challenges-by-category-name-pipe/filter-challenges-by-category-name.pipe';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomePageComponent,
				FilterChallengesByCategoryNamePipe,
			],
			providers: [
				{
					provide: ApiService,
					useValue: new SimApiService(),
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
