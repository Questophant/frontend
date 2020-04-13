import { TestBed } from '@angular/core/testing';

import { HasRegisteredGuard } from './has-registered.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { instance, mock } from 'ts-mockito';

describe('HasRegisteredGuard', () => {
	let guard: HasRegisteredGuard;
	const mockAuthService = mock(AuthService);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				{
					provide: AuthService,
					useValue: instance(mockAuthService),
				},
			],
		});
		guard = TestBed.inject(HasRegisteredGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
