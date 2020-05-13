import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { AuthService } from '../../services/auth/auth.service';
import { HasRegisteredGuard } from './has-registered.guard';

describe('HasRegisteredGuard', () => {
	let guard: HasRegisteredGuard;
	const mockAuthService = mock(AuthService);
	const mockRouter = mock(Router);
	const mockState = mock(RouterStateSnapshot);

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

		when(mockState.url).thenReturn('/');
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should return false when not registered', async (done) => {
		when(mockAuthService.checkUserRegistered()).thenResolve(false);
		when(mockRouter.navigate(deepEqual(['/welcome']), undefined)).thenResolve(true);

		guard.canActivate(undefined, instance(mockState)).then((value) => {
			expect(value).toBe(false);
			verify(mockRouter.navigate(deepEqual(['/welcome']), undefined)).called();
			done();
		});
	});

	it('should return true when registered', (done) => {
		when(mockAuthService.checkUserRegistered()).thenResolve(true);

		guard.canActivate(undefined, instance(mockState)).then((value) => {
			expect(value).toBe(true);
			done();
		});
	});

	it('should append previous page as parameter', (done) => {
		when(mockAuthService.checkUserRegistered()).thenResolve(false);
		when(mockRouter.navigate(deepEqual(['/welcome']), deepEqual({ queryParams: { redirect: btoa('/profile') } }))).thenResolve(true);
		when(mockState.url).thenReturn('/profile');

		guard.canActivate(undefined, instance(mockState)).then((value) => {
			expect(value).toBe(false);
			verify(mockRouter.navigate(deepEqual(['/welcome']), deepEqual({ queryParams: { redirect: btoa('/profile') } }))).called();
			done();
		});
	});
});
