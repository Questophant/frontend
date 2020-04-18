import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { HomePageComponent } from './home-page.component';
import { FilterChallengesByCategoryNamePipe } from '../../shared/pipes/filter-challenges-by-category-name-pipe/filter-challenges-by-category-name.pipe';
import { instance, mock, when } from 'ts-mockito';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomePageComponent,
				FilterChallengesByCategoryNamePipe,
			],
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
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
		when(mockApiService.getDailyChallenge()).thenResolve({
			id: 1,
			category: null,
			description: '',
			durationSeconds: 0,
			title: '',
		});
		expect(component).toBeTruthy();
	});
});
