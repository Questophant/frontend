import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from '../api-service/api.service';
import { SimApiService } from '../api-service/sim.api.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ApiService,
					use: SimApiService,
				},
			],
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
