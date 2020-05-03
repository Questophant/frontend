import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { anyNumber, instance, mock, when } from 'ts-mockito';
import { ApiService } from '../../shared/services/api/api.service';
import { ChallengeDetailsPageComponent } from './challenge-details-page.component';

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
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
