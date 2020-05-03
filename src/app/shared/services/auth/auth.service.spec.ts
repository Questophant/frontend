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
			localStorage.removeItem('simulation_publicUserId');

			when(
				mockApiService.createNewUser(
					deepEqual({
						publicUserId: null,
						privateUserId: null,
						userName: 'anyUserName',
						imageUrl: null,
					})
				)
			).thenResolve({
				publicUserId: 'anyUserId',
				privateUserId: 'privateUserId',
				userName: 'anyUserName',
				imageUrl: null,
			});

			await service.register('anyUserName');

			expect(localStorage.getItem('simulation_publicUserId')).toEqual(
				'anyUserId'
			);
			expect(localStorage.getItem('simulation_userId')).toEqual(
				'privateUserId'
			);
		});
	});

	describe('isUserRegistered', () => {
		it('should return false when no userId is saved in localstorage', () => {
			localStorage.removeItem('simulation_userId');

			expect(service.isUserRegistered()).toBe(false);
		});

		it('should return true when userId is saved in localstorage', () => {
			localStorage.setItem('simulation_userId', 'anyUserId');

			expect(service.isUserRegistered()).toBe(true);
		});
	});

	describe('checkUserRegistered', () => {
		it('should return false when no userId is saved in localstorage', (done) => {
			localStorage.removeItem('simulation_userId');

			service.checkUserRegistered().then((result) => {
				expect(result).toBe(false);
				done();
			});
		});

		it('should return true when api returns true', (done) => {
			localStorage.setItem('simulation_userId', 'anyUserId');

			when(mockApiService.getMyUser('anyUserId')).thenResolve({
				userName: 'anyUserName',
				publicUserId: 'anyUserId',
				privateUserId: 'privateUserId',
				imageUrl: null,
			});

			service.checkUserRegistered().then((result) => {
				expect(result).toBe(true);
				done();
			});
		});
	});
});
