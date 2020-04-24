import { TestBed } from '@angular/core/testing';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { ApiService } from '../api-service/api.service';
import { AuthService } from './auth.service';

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
			localStorage.removeItem('simulation_userId');
			when(
				mockApiService.createNewUser(
					deepEqual({
						userId: null,
						userName: 'anyUserName',
					})
				)
			).thenResolve({ userId: 'anyUserId', userName: 'anyUserName' });

			await service.register('anyUserName');

			expect(localStorage.getItem('simulation_userId')).toEqual(
				'anyUserId'
			);
		});
	});

	describe('isUserRegistered', () => {
		it('should return false when no userId is saved in localstorage', () => {
			localStorage.removeItem('simulation_userId');

			expect(service.isUserRegistered()).toBe(false);
		});

		it('should return false when no userId is saved in localstorage', () => {
			localStorage.setItem('simulation_userId', 'anyUserId');

			expect(service.isUserRegistered()).toBe(true);
		});
	});
});
