import { TestBed } from '@angular/core/testing';

import { AchievementService } from './achievement.service';
import { ApiService } from '../api/api.service';
import { instance, mock } from 'ts-mockito';

describe('AchievementService', () => {
	let service: AchievementService;
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
		service = TestBed.inject(AchievementService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
