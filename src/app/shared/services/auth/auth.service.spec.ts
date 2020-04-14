import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from '../api-service/api.service';
import { deepEqual, instance, mock, when } from 'ts-mockito';

describe('AuthService', () => {
	let service: AuthService;
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
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('register', () => {
		it('should set userId when successful', async () => {
			localStorage.removeItem('userId');
			when(mockApiService.createNewUser()).thenResolve({
				id: 'anyUserId',
				name: null,
			});
			when(
				mockApiService.updateUser(
					'anyUserId',
					deepEqual({
						id: null,
						name: 'anyUserName',
					})
				)
			).thenResolve({ id: 'anyUserId', name: 'anyUserName' });

			await service.register('anyUserName');

			expect(localStorage.getItem('userId')).toEqual('anyUserId');
		});
	});

	describe('isUserRegistered', () => {
		it('should return false when no userId is saved in localstorage', () => {
			localStorage.removeItem('userId');

			expect(service.isUserRegistered()).toBe(false);
		});

		it('should return false when no userId is saved in localstorage', () => {
			localStorage.setItem('userId', 'anyUserId');

			expect(service.isUserRegistered()).toBe(true);
		});
	});
});
