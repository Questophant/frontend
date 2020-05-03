import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { ApiService } from '../api/api.service';
import { ChallengeService } from './challenge.service';


describe('ChallengeService', () => {
	let service: ChallengeService;
	const mockApiService = mock(ApiService);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
			],
		});
		service = TestBed.inject(ChallengeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
