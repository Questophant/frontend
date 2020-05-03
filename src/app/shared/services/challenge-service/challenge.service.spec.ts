import { TestBed } from '@angular/core/testing';

import { ChallengeService } from './challenge.service';
import { ApiService } from '../api-service/api.service';
import { instance, mock } from 'ts-mockito';

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
