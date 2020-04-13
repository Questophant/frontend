import { TestBed } from '@angular/core/testing';

import { HasRegisteredGuard } from './has-registered.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('HasRegisteredGuard', () => {
	let guard: HasRegisteredGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
			],
		});
		guard = TestBed.inject(HasRegisteredGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
