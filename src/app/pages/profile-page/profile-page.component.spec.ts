import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { SimApiService } from 'src/app/shared/services/api-service/sim.api.service';
import { FilterChallengesByCategoryNamePipe } from '../../shared/pipes/filter-challenges-by-category-name-pipe/filter-challenges-by-category-name.pipe';
import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
	let component: ProfilePageComponent;
	let fixture: ComponentFixture<ProfilePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ProfilePageComponent,
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
		fixture = TestBed.createComponent(ProfilePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
