import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsPageComponent } from './challenge-details-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../shared/services/api-service/api.service';
import { anyNumber, instance, mock, when } from 'ts-mockito';

describe('ChallengeDetailsPageComponent', () => {
	let component: ChallengeDetailsPageComponent;
	let fixture: ComponentFixture<ChallengeDetailsPageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ChallengeDetailsPageComponent],
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
			],
		}).compileComponents();

		when(mockApiService.getChallengeById(anyNumber())).thenResolve(null);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChallengeDetailsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
