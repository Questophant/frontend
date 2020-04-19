import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { FilterChallengesByCategoryNamePipe } from '../../shared/pipes/filter-challenges-by-category-name-pipe/filter-challenges-by-category-name.pipe';
import { ProfilePageComponent } from './profile-page.component';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilePageComponent', () => {
	let component: ProfilePageComponent;
	let fixture: ComponentFixture<ProfilePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [
				ProfilePageComponent,
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
		fixture = TestBed.createComponent(ProfilePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
