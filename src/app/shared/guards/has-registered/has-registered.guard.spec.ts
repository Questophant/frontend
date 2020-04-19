import { TestBed } from '@angular/core/testing';

import { HasRegisteredGuard } from './has-registered.guard';
import { AuthService } from '../../services/auth/auth.service';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { Router } from '@angular/router';

describe('HasRegisteredGuard', () => {
	let guard: HasRegisteredGuard;
	const mockAuthService = mock(AuthService);
	const mockRouter = mock(Router);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				{
					provide: AuthService,
					useValue: instance(mockAuthService),
				},
				{
					provide: Router,
					useValue: instance(mockRouter),
				},
			],
		});
		guard = TestBed.inject(HasRegisteredGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should return false when not registered', () => {
		when(mockAuthService.isUserRegistered()).thenReturn(false);
		when(mockRouter.navigate(deepEqual(['/welcome']))).thenResolve(true);

		expect(guard.canActivate()).toBe(false);
		verify(mockRouter.navigate(deepEqual(['/welcome']))).called();
	});

	it('should true when registered', () => {
		when(mockAuthService.isUserRegistered()).thenReturn(true);

		expect(guard.canActivate()).toBe(true);
	});
});
