import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { ApiService } from './api-service/api.service';
import { UrlResolverService } from './url-resolver.service';

describe('UrlResolverService', () => {
	let service: UrlResolverService;
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
		service = TestBed.inject(UrlResolverService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
